/**
 * LoginPage.js
 * Page Object Model — Página de inicio de sesión de SauceDemo
 */
class LoginPage {
  // ── Selectores ────────────────────────────────────────────
  get usernameInput() { return cy.get('#user-name'); }
  get passwordInput() { return cy.get('#password'); }
  get loginButton()   { return cy.get('#login-button'); }
  get errorMessage()  { return cy.get('[data-test="error"]'); }

  /**
   * Navegar a la URL base de SauceDemo (configurada en cypress.config.js)
   */
  visit() {
    cy.visit('/');
  }

  /**
   * Realizar el inicio de sesión con las credenciales indicadas
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   */
  login(username, password) {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
  }

  /**
   * Validar que el mensaje de error de login sea visible y contenga el texto esperado
   * @param {string} expectedMessage - Texto esperado en el mensaje de error
   */
  assertErrorMessage(expectedMessage) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }
}

export default new LoginPage();
