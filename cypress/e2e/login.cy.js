describe("Login", () => {
  it("should login successfully", () => {
    cy.PerformLoginWith("alice", "password123");

    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Login successful! Welcome back."
    );
  });

  it("Should fail to login with invalid password", () => {
    cy.PerformLoginWith("alice", "wrongpassword");

    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Invalid username or password"
    );
  });

  it("Should fail to login with invalid username", () => {
    cy.PerformLoginWith("invalidUser", "password123");

    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Invalid username or password"
    );
  });

  it("shouldn't allow sign in attempt with empty username field", () => {
    cy.PerformLoginWith("", "password123");

    cy.get('[data-qa="username-field"]').should("have.value", "");
    cy.get('[data-qa="password-field"]').should("have.value", "password123");
    // Verify no success message appears (form submission was prevented)
    cy.get('[data-qa="status-text"]').should("not.be.visible");
  });

  it("shouldn't allow sign in attempt with empty password field", () => {
    cy.PerformLoginWith("charlie", "");

    cy.get('[data-qa="password-field"]').should("have.value", "");
    cy.get('[data-qa="status-text"]').should("not.be.visible");
  });

  it("should return error if account is blocked due too many failed login attempts", () => {
    cy.PerformLoginWith("dave", "wrongpassword");

    Cypress._.times(3, () => {
      cy.get('[data-qa="login-button"]').click();
    });
    cy.get('[data-qa="status-text"]').should(
      "have.text",
      "Account is blocked due to too many failed attempts"
    );
  });
});
