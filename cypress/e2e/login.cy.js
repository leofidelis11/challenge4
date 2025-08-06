describe("Login", () => {
  it("should login successfully", () => {
    cy.loginWith("alice", "password123");

    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Login successful! Welcome back."
    );
  });

  it("Should fail to login with invalid password", () => {
    cy.loginWith("alice", "wrongpassword");

    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Invalid username or password"
    );
  });

  it("Should fail to login with invalid username", () => {
    cy.loginWith("invalidUser", "password123");
    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Invalid username or password"
    );
  });

  it("shouldn't allow sign in attempt with empty username field", () => {
    cy.loginWith("", "password123");

    cy.get('[data-qa="username-field"]').should("have.value", "");
    cy.get('[data-qa="password-field"]').should("have.value", "password123");
    // Verify no success message appears (form submission was prevented)
    cy.get('[data-qa="status-text"]').should("not.be.visible");
  });

  it("shouldn't allow sign in attempt with empty password field", () => {
    cy.loginWith("charlie", "");

    cy.get('[data-qa="password-field"]').should("have.value", "");
    cy.get('[data-qa="status-text"]').should("not.be.visible");
  });

  it("should return error if account is blocked due too many failed login attempts", () => {
    cy.loginWith("dave", "wrongpassword");

    Cypress._.times(3, () => {
      cy.get('[data-qa="login-button"]').click();
    });
    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Account is blocked due to too many failed attempts"
    );
  });
});
