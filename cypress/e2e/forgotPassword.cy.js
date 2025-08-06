describe("Forgot Password", () => {
    it("Should provide new password when provided valid email", () => {
      cy.performForgotPassword("grace@example.com");

      cy.validateMessage("Password reset. Your new password is \"newpassword\".");
    });

    it("Should provide 'email not found' message when provided invalid email", () => {
        cy.performForgotPassword("invalidemail@example.com");

        cy.validateMessage("Email not found");
      });
});