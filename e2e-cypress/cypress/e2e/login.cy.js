import LoginPage from '../pages/LoginPage';

describe('Login — SauceDemo', () => {
  let testData;

  before(() => {
    cy.fixture('saucedemo').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it('Debe iniciar sesión exitosamente con credenciales válidas', () => {
    LoginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );
    cy.url().should('include', '/inventory.html');
  });

  it('Debe mostrar error al ingresar credenciales incorrectas', () => {
    LoginPage.login('usuario_invalido', 'clave_incorrecta');
    cy.url().should('not.include', '/inventory.html');
    LoginPage.assertErrorMessage(testData.expectedMessages.loginError);
  });
});
