describe("Forgot Password", () => {
    it("should provide new password when provided valid email", () => {
      cy.visit("http://localhost:4000");

      cy.get('[data-qa="forgot-password-link"]').click();
      cy.get('#email').type('grace@example.com');
      cy.contains('button', 'Reset Password').click();
      cy.get('#status-text').should(
        "have.text",
        "Password reset. Your new password is \"newpassword\".");
    });

    it("should provide 'email not found' message when provided invalid email", () => {
        cy.visit("http://localhost:4000");
  
        cy.get('[data-qa="forgot-password-link"]').click();
        cy.get('#email').type('invalidemail@example.com');
        cy.contains('button', 'Reset Password').click();
        cy.get('#status-text').should(
          "have.text",
          "Email not found");
      });
});