/**
 * CartPage.js
 * Page Object Model — Página del carrito de compras de SauceDemo
 */
class CartPage {
  // ── Selectores ────────────────────────────────────────────
  get pageTitle()              { return cy.get('.title'); }
  get cartItems()              { return cy.get('.cart_item'); }
  get checkoutButton()         { return cy.get('[data-test="checkout"]'); }
  get continueShoppingButton() { return cy.get('[data-test="continue-shopping"]'); }

  /**
   * Obtener un ítem del carrito por el nombre del producto
   * @param {string} productName - Nombre del producto
   */
  getCartItemByName(productName) {
    return cy.contains('.cart_item', productName);
  }

  /**
   * Hacer clic en el botón de Checkout
   */
  proceedToCheckout() {
    this.checkoutButton.click();
  }

  /**
   * Validar que el carrito tiene el número exacto de ítems indicado
   * @param {number} count - Cantidad esperada de ítems
   */
  assertItemCount(count) {
    this.cartItems.should('have.length', count);
  }

  /**
   * Validar que un producto específico está visible en el carrito
   * @param {string} productName - Nombre del producto
   */
  assertProductInCart(productName) {
    this.getCartItemByName(productName).should('be.visible');
  }

  /**
   * Validar que la página del carrito cargó correctamente
   */
  assertPageLoaded() {
    this.pageTitle.should('have.text', 'Your Cart');
  }
}

export default new CartPage();
