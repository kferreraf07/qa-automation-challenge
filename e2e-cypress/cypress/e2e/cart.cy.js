import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage      from '../pages/CartPage';

describe('Carrito — SauceDemo', () => {
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

  it('Debe mostrar el carrito vacío al no agregar productos', () => {
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    CartPage.assertPageLoaded();
    CartPage.cartItems.should('have.length', 0);
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Debe mostrar los productos agregados dentro del carrito', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    CartPage.assertPageLoaded();
    CartPage.assertItemCount(2);
    CartPage.assertProductInCart(testData.products.product1);
    CartPage.assertProductInCart(testData.products.product2);
  });
});
