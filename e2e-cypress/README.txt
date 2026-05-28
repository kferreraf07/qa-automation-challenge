═══════════════════════════════════════════════════════════════════
  QA AUTOMATION CHALLENGE — E2E CON CYPRESS
  Sitio bajo prueba: https://www.saucedemo.com
═══════════════════════════════════════════════════════════════════

REQUISITOS PREVIOS
──────────────────
  - Node.js >= 16.x  (verificar con: node --version)
  - npm >= 8.x       (verificar con: npm --version)
  - Google Chrome instalado (recomendado para test:chrome)

INSTALACIÓN
───────────
  1. Abrir terminal en la carpeta e2e-cypress:
     cd qa-automation-challenge/e2e-cypress

  2. Instalar todas las dependencias:
     npm install

     Esto instalará:
     ✔ cypress
     ✔ mochawesome
     ✔ mochawesome-merge
     ✔ mochawesome-report-generator

SCRIPTS DISPONIBLES
───────────────────
  npm test
    → Ejecuta TODOS los tests en modo headless (sin navegador visible).
      Ideal para CI/CD.

  npm run test:headed
    → Ejecuta los tests con el navegador visible.
      Útil para debugging.

  npm run test:chrome
    → Ejecuta los tests en Google Chrome en modo headless.

  npm run test:report
    → Ejecuta tests + genera reporte HTML de mochawesome.
      El reporte se guarda en cypress/reports/

  npm run open
    → Abre la interfaz gráfica de Cypress (Cypress Launchpad).
      Permite seleccionar y ejecutar tests individualmente.

CÓMO ABRIR CYPRESS UI (modo interactivo)
─────────────────────────────────────────
  npm run open

  Luego en la UI:
    1. Seleccionar "E2E Testing"
    2. Elegir navegador (Chrome recomendado)
    3. Hacer clic en "saucedemo.cy.js" para ejecutar

GENERACIÓN DE REPORTES
──────────────────────
  Opción 1 — Reporte automático completo:
    npm run test:report

  Opción 2 — Manualmente después de ejecutar:
    npm run report:merge
    npm run report:generate

  Ver el reporte:
    Abrir en el navegador: cypress/reports/mochawesome.html

  Otros artefactos generados:
    cypress/screenshots/  → Capturas automáticas en caso de fallo
    cypress/videos/       → Grabación de video de cada spec ejecutada

ESTRUCTURA DEL PROYECTO
───────────────────────
  e2e-cypress/
  ├── cypress/
  │   ├── e2e/
  │   │   └── saucedemo.cy.js       → Spec principal (todos los test cases)
  │   ├── fixtures/
  │   │   └── saucedemo.json        → Datos de prueba (credenciales, productos)
  │   ├── pages/                    → Page Object Model (POM)
  │   │   ├── LoginPage.js          → Acciones e interacciones del login
  │   │   ├── InventoryPage.js      → Acciones del catálogo de productos
  │   │   ├── CartPage.js           → Acciones del carrito de compras
  │   │   └── CheckoutPage.js       → Acciones del proceso de checkout
  │   ├── support/
  │   │   ├── commands.js           → Comandos personalizados reutilizables
  │   │   └── e2e.js               → Configuración global de soporte
  │   ├── screenshots/              → Capturas de pantalla (auto-generadas)
  │   ├── videos/                   → Videos de ejecución (auto-generados)
  │   └── reports/                  → Reportes HTML (auto-generados)
  ├── cypress.config.js             → Configuración principal de Cypress
  ├── package.json                  → Dependencias y scripts npm
  └── README.txt                    → Este archivo

CASOS DE PRUEBA CUBIERTOS
──────────────────────────
  TC-001: Flujo completo de compra (Happy Path)
    ✔ Login con standard_user / secret_sauce
    ✔ Agregar "Sauce Labs Backpack" al carrito
    ✔ Agregar "Sauce Labs Bike Light" al carrito
    ✔ Verificar badge del carrito = 2
    ✔ Navegar al carrito y validar 2 productos
    ✔ Iniciar checkout con: Kelin / Ferrera / 12345
    ✔ Validar pantalla de resumen del pedido
    ✔ Finalizar compra
    ✔ Validar mensaje "Thank you for your order!"

  TC-002: Login con credenciales inválidas (Negative Test)
    ✔ Intentar login con datos incorrectos
    ✔ Validar mensaje de error apropiado

  TC-003: Carrito vacío
    ✔ Navegar al carrito sin agregar productos
    ✔ Validar que no hay ítems en el carrito

MODIFICAR DATOS DE PRUEBA
──────────────────────────
  Para cambiar usuario, productos o datos del checkout:
  Editar: cypress/fixtures/saucedemo.json

═══════════════════════════════════════════════════════════════════
