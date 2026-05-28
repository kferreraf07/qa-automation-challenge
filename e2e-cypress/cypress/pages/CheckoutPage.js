/**
 * CheckoutPage.js
 * Page Object Model — Páginas del proceso de checkout de SauceDemo
 * Cubre: Step One (información), Step Two (resumen) y Confirmation (confirmación)
 */
class CheckoutPage {
  // ── Selectores — Paso 1: Información del comprador ────────
  get firstNameInput() { return cy.get('[data-test="firstName"]'); }
  get lastNameInput()  { return cy.get('[data-test="lastName"]'); }
  get zipCodeInput()   { return cy.get('[data-test="postalCode"]'); }
  get continueButton() { return cy.get('[data-test="continue"]'); }

  // ── Selectores — Paso 2: Resumen del pedido ───────────────
  get finishButton()   { return cy.get('[data-test="finish"]'); }
  get summaryItems()   { return cy.get('.cart_item'); }

  // ── Selectores — Confirmación ─────────────────────────────
  get confirmationHeader() { return cy.get('.complete-header'); }
  get confirmationText()   { return cy.get('.complete-text'); }
  get backHomeButton()     { return cy.get('[data-test="back-to-products"]'); }

  /**
   * Completar el formulario de información del checkout (Paso 1)
   * @param {string} firstName - Nombre del comprador
   * @param {string} lastName  - Apellido del comprador
   * @param {string} zipCode   - Código postal
   */
  fillCheckoutInformation(firstName, lastName, zipCode) {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.zipCodeInput.clear().type(zipCode);
    this.continueButton.click();
  }

  /**
   * Confirmar y finalizar el pedido desde la pantalla de resumen (Paso 2)
   */
  finishOrder() {
    this.finishButton.click();
  }

  /**
   * Validar el mensaje de confirmación de la compra
   * @param {string} expectedMessage - Mensaje esperado en el header de confirmación
   */
  assertOrderConfirmation(expectedMessage) {
    this.confirmationHeader
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  /**
   * Validar que la página de información del checkout (Paso 1) cargó
   */
  assertStepOneLoaded() {
    cy.get('.title').should('have.text', 'Checkout: Your Information');
  }

  /**
   * Validar que la página de resumen del pedido (Paso 2) cargó
   */
  assertStepTwoLoaded() {
    cy.get('.title').should('have.text', 'Checkout: Overview');
  }
}

export default new CheckoutPage();
