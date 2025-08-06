describe("Forgot Password", () => {
    it("should provide new password when provided valid email", () => {
      cy.performForgotPassword("grace@example.com");

      cy.get('#status-text').should(
        "have.text",
        "Password reset. Your new password is \"newpassword\".");
    });

    it("should provide 'email not found' message when provided invalid email", () => {
        cy.performForgotPassword("invalidemail@example.com");
        
        cy.get('#status-text').should(
          "have.text",
          "Email not found");
      });
});