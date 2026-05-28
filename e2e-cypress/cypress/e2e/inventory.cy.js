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
    cy.get('.title').should('be.visible').and('have.text', 'Products');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('.inventory_item_name').first().should('be.visible');
  });

  it('Debe agregar un producto al carrito y mostrar el badge en 1', () => {
    InventoryPage.addProductToCart(testData.products.product1);

    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1');
  });

  it('Debe agregar dos productos al carrito y mostrar el badge en 2', () => {
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);

    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '2');
  });

  it('Debe mostrar el nombre y precio de cada producto', () => {
    cy.contains('.inventory_item_name', testData.products.product1)
      .should('be.visible');
    cy.contains('.inventory_item_name', testData.products.product2)
      .should('be.visible');
    cy.get('.inventory_item_price').first()
      .should('be.visible')
      .and('match', /^\$\d+\.\d{2}$/);
  });
});
