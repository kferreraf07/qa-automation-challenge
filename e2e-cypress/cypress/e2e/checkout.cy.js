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
    // Agregar productos
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);
    InventoryPage.goToCart();

    // Validar carrito
    cy.url().should('include', '/cart.html');
    cy.get('.title').should('have.text', 'Your Cart');
    cy.get('.cart_item').should('have.length', 2);

    // Ir a checkout paso 1
    CartPage.proceedToCheckout();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('.title').should('be.visible').and('have.text', 'Checkout: Your Information');

    // Completar formulario
    CheckoutPage.fillCheckoutInformation(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.zipCode
    );

    // Validar resumen (paso 2)
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.title').should('be.visible').and('have.text', 'Checkout: Overview');
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.cart_item', testData.products.product1).should('be.visible');
    cy.contains('.cart_item', testData.products.product2).should('be.visible');
    cy.get('.summary_total_label').should('be.visible');

    // Finalizar orden
    CheckoutPage.finishOrder();

    // Validar confirmación
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Thank you for your order!').should('be.visible');
    cy.get('.complete-text').should('be.visible');
    cy.get('[data-test="back-to-products"]').should('be.visible');
  });

  it('Debe mostrar error al enviar el formulario de checkout vacío', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.goToCart();
    CartPage.proceedToCheckout();

    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });
});
