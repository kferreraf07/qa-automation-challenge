/**
 * commands.js
 * Comandos personalizados de Cypress reutilizables en toda la suite
 */

/**
 * Comando de login rápido que omite la UI y va directo a la sesión
 * Útil para tests que necesitan estar logueados pero no prueban el login en sí
 */
Cypress.Commands.add('loginViaUI', (username, password) => {
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});

/**
 * Comando para agregar un producto al carrito por nombre desde la página de inventario
 * @param {string} productName - Nombre visible del producto
 */
Cypress.Commands.add('addToCartByName', (productName) => {
  cy.contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click();
});
