describe("Forgot Password", () => {
    it("Should provide new password when valid email is entered", () => {
      cy.performForgotPassword("grace@example.com");

      cy.validateMessage("Password reset. Your new password is \"newpassword\".");
    });

    it("Should display 'email not found' message when invalid email is entered", () => {
        cy.performForgotPassword("invalidemail@example.com");

        cy.validateMessage("Email not found");
      });
});