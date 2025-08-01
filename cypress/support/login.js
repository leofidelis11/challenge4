Cypress.Commands.add('loginWith', (username, password) => {
    cy.get('[data-qa="username-field"]').as('username');
    cy.get('[data-qa="password-label"]').as('password');

    username.length === 0 
        ? cy.get('@username').clear() 
        : cy.get('@username').click().type(username);

    cy.get('@password').click().type(password);
    cy.get('[data-qa="login-button"]').click();
})