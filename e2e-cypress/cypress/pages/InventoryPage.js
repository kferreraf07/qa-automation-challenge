/**
 * InventoryPage.js
 * Page Object Model — Página de inventario / catálogo de productos de SauceDemo
 */
class InventoryPage {
  // ── Selectores ────────────────────────────────────────────
  get pageTitle()    { return cy.get('.title'); }
  get productItems() { return cy.get('.inventory_item'); }
  get cartBadge()    { return cy.get('.shopping_cart_badge'); }
  get cartIcon()     { return cy.get('.shopping_cart_link'); }

  /**
   * Obtener el botón "Add to cart" de un producto por su nombre visible
   * @param {string} productName - Nombre exacto del producto
   */
  getAddToCartButton(productName) {
    return cy
      .contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button[id^="add-to-cart"]');
  }

  /**
   * Agregar un producto al carrito por su nombre
   * @param {string} productName - Nombre del producto
   */
  addProductToCart(productName) {
    this.getAddToCartButton(productName).click();
  }

  /**
   * Navegar al carrito de compras
   */
  goToCart() {
    this.cartIcon.click();
  }

  /**
   * Validar que el badge del carrito muestra la cantidad esperada
   * @param {number} count - Número de ítems esperados
   */
  assertCartBadgeCount(count) {
    this.cartBadge
      .should('be.visible')
      .and('have.text', String(count));
  }

  /**
   * Validar que la página de inventario cargó correctamente
   */
  assertPageLoaded() {
    this.pageTitle.should('have.text', 'Products');
    this.productItems.should('have.length.greaterThan', 0);
  }
}

export default new InventoryPage();
