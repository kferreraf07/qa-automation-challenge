import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Inventario — SauceDemo', () => {
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

  it('Debe cargar la página de inventario con productos visibles', () => {
    InventoryPage.assertPageLoaded();
  });

  it('Debe agregar un producto al carrito y mostrar el badge en 1', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.assertCartBadgeCount(1);
  });

  it('Debe agregar dos productos al carrito y mostrar el badge en 2', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);
    InventoryPage.assertCartBadgeCount(2);
  });
});
