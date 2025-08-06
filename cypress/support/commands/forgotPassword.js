Cypress.Commands.add("performForgotPassword", (email) => {
    cy.visit("http://localhost:4000");
    cy.get('[data-qa="forgot-password-link"]').click();
    cy.get('[data-qa="email-field"]').type(email);
    cy.contains('button', 'Reset Password').click();
});