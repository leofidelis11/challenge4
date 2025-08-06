Cypress.Commands.add("validateMessage", (message) => {
    cy.get('[data-qa="status-text"]').should(
      "have.text",
      message
    );
});

Cypress.Commands.add('validateFieldEmpty', (nameField) => {
    if(nameField == 'username'){
        cy.get('[data-qa="username-field"]').should("have.value", "");
        cy.get('[data-qa="password-field"]').invoke("val").should("not.be.empty");
    } else {
        cy.get('[data-qa="password-field"]').should("have.value", "");
        cy.get('[data-qa="username-field"]').should("not.have.value");
    }

    cy.get('[data-qa="status-text"]').should("not.be.visible");
})