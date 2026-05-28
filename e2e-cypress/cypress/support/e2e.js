/**
 * e2e.js
 * Archivo de soporte global de Cypress — se ejecuta antes de cada spec
 */

// Importar comandos personalizados
import './commands';

// Suprimir excepciones no capturadas del sitio bajo prueba
// Evita que errores de la app (no del test) interrumpan la ejecución
Cypress.on('uncaught:exception', (err) => {
  // Retornar false previene que Cypress falle el test
  console.warn('Excepción no capturada ignorada:', err.message);
  return false;
});

// Log de inicio de suite
before(() => {
  cy.log('▶ Iniciando suite de automatización — SauceDemo QA Challenge');
});
