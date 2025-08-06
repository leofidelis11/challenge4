Cypress.Commands.add("performLoginWith", (username, password) => {
  cy.visit("http://localhost:4000");
  cy.get('[data-qa="username-field"]').as("username");
  cy.get('[data-qa="password-label"]').as("passwordLabel");
  cy.get('[data-qa="password-field"]').as("password");
  cy.get("@password").should('be.visible');

  username.length === 0
    ? cy.get("@username").clear()
    : cy.get("@username").click().type(username);

  cy.press(Cypress.Keyboard.Keys.TAB);
  password.length === 0
    ? cy.get("@password").clear()
    : cy.get("@password").click().type(password);

  cy.get('[data-qa="login-button"]').click();
});
