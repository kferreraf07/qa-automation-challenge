/**
 * cypress.config.js
 * Configuración principal de Cypress para el proyecto QA Automation Challenge
 */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL base — todas las llamadas cy.visit('/') apuntarán aquí
    baseUrl: 'https://www.saucedemo.com',

    // Patrón de specs
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',

    // Archivo de soporte
    supportFile: 'cypress/support/e2e.js',

    // ── Capturas de pantalla ──────────────────────────────────
    screenshotOnRunFailure: true,      // Captura automática en fallos
    screenshotsFolder: 'cypress/screenshots',

    // ── Videos ────────────────────────────────────────────────
    video: true,
    videosFolder: 'cypress/videos',

    // ── Viewport ──────────────────────────────────────────────
    viewportWidth: 1280,
    viewportHeight: 720,

    // ── Timeouts ──────────────────────────────────────────────
    defaultCommandTimeout: 8000,   // Timeout por defecto para comandos DOM
    pageLoadTimeout: 30000,        // Timeout para carga de páginas
    requestTimeout: 10000,         // Timeout para peticiones HTTP

    // ── Reporte (mochawesome) ─────────────────────────────────
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },

    setupNodeEvents(on, config) {
      // Aquí se pueden registrar plugins y event listeners adicionales
      return config;
    },
  },
});
