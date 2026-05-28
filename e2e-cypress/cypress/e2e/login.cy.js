import LoginPage from '../pages/LoginPage';

describe('Login — SauceDemo', () => {
  let users;
  let messages;

  before(() => {
    cy.fixture('users').then((data) => { users = data; });
    cy.fixture('messages').then((data) => { messages = data; });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it('Debe iniciar sesión exitosamente con credenciales válidas', () => {
    LoginPage.login(users.validUser.username, users.validUser.password);

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('have.text', 'Products');
    cy.get('.inventory_list').should('be.visible');
  });

  it('Debe mostrar error al ingresar credenciales incorrectas', () => {
    LoginPage.login(users.invalidUser.username, users.invalidUser.password);

    cy.url().should('not.include', '/inventory.html');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', messages.loginError);
  });

  it('Debe mostrar el formulario de login al cargar la página', () => {
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible').and('have.value', 'Login');
  });
});
