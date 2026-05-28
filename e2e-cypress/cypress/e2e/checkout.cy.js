import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage      from '../pages/CartPage';
import CheckoutPage  from '../pages/CheckoutPage';

describe('Checkout — SauceDemo', () => {
  let users;
  let products;
  let checkout;
  let messages;

  before(() => {
    cy.fixture('users').then((data) => { users = data; });
    cy.fixture('products').then((data) => { products = data; });
    cy.fixture('checkout').then((data) => { checkout = data; });
    cy.fixture('messages').then((data) => { messages = data; });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(users.validUser.username, users.validUser.password);
    cy.url().should('include', '/inventory.html');
  });

  it('Debe completar el flujo completo de compra exitosamente', () => {
    InventoryPage.addProductToCart(products.product1);
    InventoryPage.addProductToCart(products.product2);
    InventoryPage.goToCart();

    cy.url().should('include', '/cart.html');
    cy.get('.title').should('have.text', 'Your Cart');
    cy.get('.cart_item').should('have.length', 2);

    CartPage.proceedToCheckout();

    cy.url().should('include', '/checkout-step-one.html');
    cy.get('.title').should('be.visible').and('have.text', 'Checkout: Your Information');

    CheckoutPage.fillCheckoutInformation(
      checkout.firstName,
      checkout.lastName,
      checkout.postalCode
    );

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.title').should('be.visible').and('have.text', 'Checkout: Overview');
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.cart_item', products.product1).should('be.visible');
    cy.contains('.cart_item', products.product2).should('be.visible');
    cy.get('.summary_total_label').should('be.visible');

    CheckoutPage.finishOrder();

    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Thank you for your order!').should('be.visible');
    cy.get('.complete-text').should('be.visible');
    cy.get('[data-test="back-to-products"]').should('be.visible');
  });

  it('Debe mostrar error al enviar el formulario de checkout vacío', () => {
    InventoryPage.addProductToCart(products.product1);
    InventoryPage.goToCart();
    CartPage.proceedToCheckout();

    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', messages.checkoutError);
  });
});
