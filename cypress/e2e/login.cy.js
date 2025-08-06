describe("Login", () => {
  it("Should login successfully", () => {
    cy.performLoginWith("alice", "password123");

    cy.validateMessage("Login successful! Welcome back.");
  });

  it("Should fail to login with invalid password", () => {
    cy.performLoginWith("alice", "wrongpassword");

    cy.validateMessage("Invalid username or password");
  });

  it("Should fail to login with invalid username", () => {
    cy.performLoginWith("invalidUser", "password123");

    cy.validateMessage("Invalid username or password");
  });

  it("Shouldn't allow sign in attempt with empty username field", () => {
    cy.performLoginWith("", "password123");

    cy.validateFieldEmpty("username");
  });

  it("Shouldn't allow sign in attempt with empty password field", () => {
    cy.performLoginWith("charlie", "");

    cy.validateFieldEmpty("password");
    // cy.get('[data-qa="password-field"]').should("have.value", "");
    // cy.get('[data-qa="status-text"]').should("not.be.visible");
  });

  it("Should return error if account is blocked due too many failed login attempts", () => {
    cy.performLoginWith("dave", "wrongpassword");

    Cypress._.times(3, () => {
      cy.get('[data-qa="login-button"]').click();
    });

    cy.validateMessage("Account is blocked due to too many failed attempts");
  });
});
