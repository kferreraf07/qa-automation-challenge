import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage      from '../pages/CartPage';
import CheckoutPage  from '../pages/CheckoutPage';

describe('Checkout — SauceDemo', () => {
  let testData;

  before(() => {
    cy.fixture('saucedemo').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );
    cy.url().should('include', '/inventory.html');
  });

  it('Debe completar el flujo completo de compra exitosamente', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');

    CartPage.assertPageLoaded();
    CartPage.assertItemCount(2);
    CartPage.proceedToCheckout();
    cy.url().should('include', '/checkout-step-one.html');

    CheckoutPage.assertStepOneLoaded();
    CheckoutPage.fillCheckoutInformation(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.zipCode
    );
    cy.url().should('include', '/checkout-step-two.html');

    CheckoutPage.assertStepTwoLoaded();
    CheckoutPage.finishOrder();
    cy.url().should('include', '/checkout-complete.html');

    CheckoutPage.assertOrderConfirmation(
      testData.expectedMessages.orderConfirmation
    );
  });
});
