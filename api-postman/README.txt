═══════════════════════════════════════════════════════════════════
  QA AUTOMATION CHALLENGE — API CON POSTMAN / NEWMAN
  API bajo prueba: PetStore Swagger — https://petstore.swagger.io/
═══════════════════════════════════════════════════════════════════

REQUISITOS PREVIOS
──────────────────
  - Node.js >= 16.x       (verificar con: node --version)
  - npm >= 8.x            (verificar con: npm --version)
  - Newman (CLI de Postman)
  - newman-reporter-htmlextra (reporte HTML enriquecido)

INSTALACIÓN DE NEWMAN
─────────────────────
  Instalar Newman globalmente:
    npm install -g newman

  Instalar reporter HTML (recomendado):
    npm install -g newman-reporter-htmlextra

  Verificar instalación:
    newman --version

IMPORTAR EN POSTMAN (Interfaz Gráfica)
───────────────────────────────────────
  1. Abrir Postman Desktop App
  2. Clic en "Import"
  3. Importar colección:
     → collections/PetstoreUsers.postman_collection.json
  4. Importar entorno:
     → environments/PetstoreEnvironment.postman_environment.json
  5. En la barra superior, seleccionar el entorno:
     "Petstore - QA Challenge Environment"
  6. Abrir la colección "Petstore Users API - QA Challenge"
  7. Clic en "Run collection" para ejecutar todos los requests

EJECUCIÓN CON NEWMAN (Línea de Comandos)
──────────────────────────────────────────
  Desde la carpeta api-postman/:

  ── Ejecución básica con reporte en consola: ──────────────────
    newman run collections/PetstoreUsers.postman_collection.json ^
           -e environments/PetstoreEnvironment.postman_environment.json

  ── Con reporte HTML (htmlextra): ──────────────────────────────
    newman run collections/PetstoreUsers.postman_collection.json ^
           -e environments/PetstoreEnvironment.postman_environment.json ^
           -r htmlextra ^
           --reporter-htmlextra-export reports/newman-report.html

  ── Con reporte CLI detallado + HTML: ──────────────────────────
    newman run collections/PetstoreUsers.postman_collection.json ^
           -e environments/PetstoreEnvironment.postman_environment.json ^
           --reporters cli,htmlextra ^
           --reporter-htmlextra-export reports/newman-report.html ^
           --reporter-htmlextra-title "Petstore API - QA Challenge Report"

  (En Linux/Mac reemplazar ^ por \)

VER REPORTE HTML
────────────────
  Abrir en el navegador:
    reports/newman-report.html

FLUJO DE PRUEBAS IMPLEMENTADO
──────────────────────────────
  Orden   Método   Endpoint               Descripción
  ──────  ───────  ─────────────────────  ────────────────────────────────
  1       POST     /user                  Crear usuario "kelinqa"
  2       GET      /user/kelinqa          Verificar creación del usuario
  3       PUT      /user/kelinqa          Actualizar firstName y email
  4       GET      /user/kelinqa          Verificar datos actualizados
  5       DELETE   /user/kelinqa          Eliminar usuario (limpieza)

VALIDACIONES POR REQUEST
──────────────────────────
  1. Create User:
     ✔ Status code 200
     ✔ Content-Type es application/json
     ✔ Response body tiene: code, type, message
     ✔ type es "unknown"
     ✔ Tiempo de respuesta < 5000ms

  2. Get User:
     ✔ Status code 200
     ✔ username es "kelinqa"
     ✔ firstName es "Kelin" (valor original)
     ✔ email es "kelin@test.com" (valor original)
     ✔ Response tiene: id, username, firstName, lastName, email
     ✔ Tiempo de respuesta < 5000ms

  3. Update User:
     ✔ Status code 200
     ✔ Response body tiene: code, type, message
     ✔ code es 200
     ✔ Tiempo de respuesta < 5000ms

  4. Get Updated User:
     ✔ Status code 200
     ✔ firstName es "Kelin Actualizado"
     ✔ email es "nuevo@test.com"
     ✔ phone es "88888888"
     ✔ username permanece igual
     ✔ Tiempo de respuesta < 5000ms

  5. Delete User:
     ✔ Status code 200
     ✔ Response body tiene: code, type, message
     ✔ message incluye "kelinqa"
     ✔ Tiempo de respuesta < 5000ms

VARIABLES DE ENTORNO
────────────────────
  Variable    Valor                          Descripción
  ──────────  ─────────────────────────────  ────────────────────────────
  base_url    https://petstore.swagger.io/v2  URL base de la API
  username    kelinqa                         Username del usuario de prueba

ESTRUCTURA DE ARCHIVOS
──────────────────────
  api-postman/
  ├── collections/
  │   └── PetstoreUsers.postman_collection.json  → Colección completa
  ├── environments/
  │   └── PetstoreEnvironment.postman_environment.json → Variables de entorno
  ├── reports/
  │   └── newman-report.html                     → Reporte (se genera al ejecutar)
  ├── README.txt                                 → Este archivo
  └── conclusiones.txt                           → Conclusiones y análisis

NOTA IMPORTANTE
────────────────
  PetStore es una API pública de demostración compartida entre múltiples
  usuarios. Si el usuario "kelinqa" ya fue creado previamente por otra
  persona, la API devuelve status 200 igualmente. El flujo de pruebas
  funciona correctamente en ambos casos.

═══════════════════════════════════════════════════════════════════
