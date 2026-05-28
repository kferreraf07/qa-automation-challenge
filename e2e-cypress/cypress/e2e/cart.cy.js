import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage      from '../pages/CartPage';

describe('Carrito — SauceDemo', () => {
  let users;
  let products;

  before(() => {
    cy.fixture('users').then((data) => { users = data; });
    cy.fixture('products').then((data) => { products = data; });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(users.validUser.username, users.validUser.password);
    cy.url().should('include', '/inventory.html');
  });

  it('Debe mostrar el carrito vacío al no agregar productos', () => {
    InventoryPage.goToCart();

    cy.url().should('include', '/cart.html');
    cy.get('.title').should('be.visible').and('have.text', 'Your Cart');
    cy.get('.cart_item').should('have.length', 0);
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Debe mostrar los productos agregados dentro del carrito', () => {
    InventoryPage.addProductToCart(products.product1);
    InventoryPage.addProductToCart(products.product2);
    InventoryPage.goToCart();

    cy.url().should('include', '/cart.html');
    cy.get('.title').should('be.visible').and('have.text', 'Your Cart');
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.cart_item', products.product1).should('be.visible');
    cy.contains('.cart_item', products.product2).should('be.visible');
  });

  it('Debe mostrar el botón de checkout habilitado en el carrito', () => {
    InventoryPage.addProductToCart(products.product1);
    InventoryPage.goToCart();

    cy.get('[data-test="checkout"]')
      .should('be.visible')
      .and('not.be.disabled');
  });
});
