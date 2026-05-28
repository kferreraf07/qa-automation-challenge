/**
 * saucedemo.cy.js
 * Suite de pruebas E2E para SauceDemo
 * Flujo completo: Login → Agregar productos → Carrito → Checkout → Confirmación
 */

import LoginPage     from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage      from '../pages/CartPage';
import CheckoutPage  from '../pages/CheckoutPage';

describe('SauceDemo — Flujo Completo de Compra', () => {
  let testData;

  // Cargar fixture antes de todos los tests
  before(() => {
    cy.fixture('saucedemo').then((data) => {
      testData = data;
    });
  });

  // Navegar a la app antes de cada test
  beforeEach(() => {
    LoginPage.visit();
  });

  // ────────────────────────────────────────────────────────────
  // TEST PRINCIPAL: Flujo completo de compra (Happy Path)
  // ────────────────────────────────────────────────────────────
  it('Debe completar el flujo completo de compra exitosamente', () => {
    // ── PASO 1: Inicio de sesión ──────────────────────────────
    LoginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );

    // Verificar redirección a la página de inventario
    cy.url().should('include', '/inventory.html');
    InventoryPage.assertPageLoaded();

    // ── PASO 2: Agregar dos productos al carrito ──────────────
    InventoryPage.addProductToCart(testData.products.product1);
    InventoryPage.addProductToCart(testData.products.product2);

    // Verificar que el badge del carrito refleja 2 ítems
    InventoryPage.assertCartBadgeCount(2);

    // ── PASO 3: Ir al carrito y verificar contenido ───────────
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');

    CartPage.assertPageLoaded();
    CartPage.assertItemCount(2);
    CartPage.assertProductInCart(testData.products.product1);
    CartPage.assertProductInCart(testData.products.product2);

    // ── PASO 4: Checkout — completar información ──────────────
    CartPage.proceedToCheckout();
    cy.url().should('include', '/checkout-step-one.html');

    CheckoutPage.assertStepOneLoaded();
    CheckoutPage.fillCheckoutInformation(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.zipCode
    );

    // ── PASO 4b: Verificar pantalla de resumen del pedido ─────
    cy.url().should('include', '/checkout-step-two.html');
    CheckoutPage.assertStepTwoLoaded();

    // ── PASO 5: Finalizar la compra ───────────────────────────
    CheckoutPage.finishOrder();
    cy.url().should('include', '/checkout-complete.html');

    // ── PASO 6: Validar mensaje de confirmación ───────────────
    CheckoutPage.assertOrderConfirmation(
      testData.expectedMessages.orderConfirmation
    );
  });

  // ────────────────────────────────────────────────────────────
  // TEST NEGATIVO: Credenciales inválidas
  // ────────────────────────────────────────────────────────────
  it('Debe mostrar error al ingresar credenciales incorrectas', () => {
    LoginPage.login('usuario_invalido', 'clave_incorrecta');

    // Verificar que sigue en la página de login (sin redirección)
    cy.url().should('not.include', '/inventory.html');

    // Verificar que se muestra el mensaje de error
    LoginPage.assertErrorMessage(
      testData.expectedMessages.loginError
    );
  });

  // ────────────────────────────────────────────────────────────
  // TEST: Verificar que el carrito se vacía correctamente
  // ────────────────────────────────────────────────────────────
  it('Debe mostrar el carrito vacío al no agregar productos', () => {
    LoginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );

    cy.url().should('include', '/inventory.html');

    // Ir al carrito sin agregar productos
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');

    CartPage.assertPageLoaded();

    // El carrito no debe contener ítems
    CartPage.cartItems.should('have.length', 0);

    // El badge del carrito no debe ser visible
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
