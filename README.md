# QA Automation Challenge

Proyecto completo de automatización QA que cubre pruebas E2E con Cypress y pruebas de API con Postman/Newman.

---

## Herramientas Utilizadas

| Herramienta | Versión | Propósito |
|---|---|---|
| Cypress | ^13.6.0 | Automatización E2E |
| JavaScript | ES6+ | Lenguaje de los tests |
| Page Object Model | — | Patrón de diseño |
| Postman | 10.x | Diseño de colección API |
| Newman | latest | Ejecución CLI de Postman |
| newman-reporter-htmlextra | latest | Reportes HTML de API |
| Mochawesome | ^7.1.3 | Reportes HTML de Cypress |
| Node.js | >=16.x | Runtime |

---

## Estructura del Proyecto

```
qa-automation-challenge/
│
├── e2e-cypress/                        # Automatización E2E
│   ├── cypress/
│   │   ├── e2e/
│   │   │   └── saucedemo.cy.js         # Spec principal — todos los test cases
│   │   ├── fixtures/
│   │   │   └── saucedemo.json          # Datos de prueba externalizados
│   │   ├── pages/                      # Page Object Model (POM)
│   │   │   ├── LoginPage.js
│   │   │   ├── InventoryPage.js
│   │   │   ├── CartPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── support/
│   │   │   ├── commands.js             # Comandos personalizados
│   │   │   └── e2e.js                  # Configuración global
│   │   ├── screenshots/                # Capturas automáticas en fallos
│   │   ├── videos/                     # Grabaciones de ejecución
│   │   └── reports/                    # Reportes Mochawesome
│   ├── cypress.config.js               # Configuración de Cypress
│   ├── package.json
│   └── README.txt
│
├── api-postman/                        # Automatización de APIs
│   ├── collections/
│   │   └── PetstoreUsers.postman_collection.json
│   ├── environments/
│   │   └── PetstoreEnvironment.postman_environment.json
│   ├── reports/                        # Reportes Newman HTML
│   ├── README.txt
│   └── conclusiones.txt
│
├── README.md                           # Este archivo
└── conclusiones.txt                    # Conclusiones generales
```

---

## Parte 1 — Automatización E2E (Cypress + SauceDemo)

**Sitio:** https://www.saucedemo.com

### Instalación

```bash
cd e2e-cypress
npm install
```

### Ejecución

```bash
# Headless (CI/CD)
npm test

# Con navegador visible
npm run test:headed

# En Chrome
npm run test:chrome

# Interfaz gráfica de Cypress
npm run open
```

### Generación de Reportes E2E

```bash
# Ejecutar tests + generar reporte HTML completo
npm run test:report
```

El reporte HTML se genera en: `cypress/reports/mochawesome.html`

### Casos de Prueba

| ID | Descripción | Tipo |
|---|---|---|
| TC-001 | Flujo completo de compra (Login → Checkout → Confirmación) | Happy Path |
| TC-002 | Login con credenciales inválidas | Negative Test |
| TC-003 | Carrito vacío sin agregar productos | Edge Case |

---

## Parte 2 — Automatización API (Postman + Newman + PetStore)

**API:** https://petstore.swagger.io/  
**Base URL:** `https://petstore.swagger.io/v2`

### Instalación de Newman

```bash
npm install -g newman
npm install -g newman-reporter-htmlextra
```

### Importar en Postman (UI)

1. Abrir Postman → **Import**
2. Importar: `api-postman/collections/PetstoreUsers.postman_collection.json`
3. Importar: `api-postman/environments/PetstoreEnvironment.postman_environment.json`
4. Seleccionar entorno: **Petstore - QA Challenge Environment**
5. Ejecutar con **Run Collection**

### Ejecución con Newman

```bash
# Desde la carpeta api-postman/

# Ejecución básica
newman run collections/PetstoreUsers.postman_collection.json \
       -e environments/PetstoreEnvironment.postman_environment.json

# Con reporte HTML (recomendado)
newman run collections/PetstoreUsers.postman_collection.json \
       -e environments/PetstoreEnvironment.postman_environment.json \
       -r htmlextra \
       --reporter-htmlextra-export reports/newman-report.html
```

> En Windows (PowerShell), reemplazar `\` por `` ` `` (backtick) para saltos de línea.

### Flujo de Pruebas API

| # | Método | Endpoint | Descripción |
|---|---|---|---|
| 1 | POST | /user | Crear usuario |
| 2 | GET | /user/kelinqa | Verificar creación |
| 3 | PUT | /user/kelinqa | Actualizar datos |
| 4 | GET | /user/kelinqa | Verificar actualización |
| 5 | DELETE | /user/kelinqa | Eliminar usuario |

---

## Screenshots y Evidencias

| Tipo | Ubicación | Cuándo se genera |
|---|---|---|
| Screenshots Cypress | `e2e-cypress/cypress/screenshots/` | Automático en fallos |
| Videos Cypress | `e2e-cypress/cypress/videos/` | Cada ejecución |
| Reporte HTML Cypress | `e2e-cypress/cypress/reports/` | Con `npm run test:report` |
| Reporte HTML Newman | `api-postman/reports/newman-report.html` | Con flag `-r htmlextra` |

---

## Variables de Entorno

### Cypress (fixtures/saucedemo.json)

```json
{
  "credentials": { "username": "standard_user", "password": "secret_sauce" },
  "products":    { "product1": "Sauce Labs Backpack", "product2": "Sauce Labs Bike Light" },
  "checkout":    { "firstName": "Kelin", "lastName": "Ferrera", "zipCode": "12345" }
}
```

### Postman / Newman (environments/PetstoreEnvironment.postman_environment.json)

```
base_url  →  https://petstore.swagger.io/v2
username  →  kelinqa
```

---

## Publicar en GitHub

```bash
git init
git add .
git commit -m "feat: QA Automation Challenge - Cypress E2E + Postman API"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/qa-automation-challenge.git
git push -u origin main
```

---

## Autor

**Kelin Ferrera**  
kelinferrera07@gmail.com  
QA Automation Engineer

---

*Proyecto desarrollado como QA Automation Challenge — Mayo 2026*
