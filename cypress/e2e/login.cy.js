describe('Login', () => {
    it('should login successfully', () => {
        cy.visit('http://localhost:4000');
        cy.get('[data-qa="username-field"]').click().type('alice');
        cy.get('[data-qa="password-label"]').click().type('password123');
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="status-text"]').should('have.text', 'Login successful! Welcome back.');
    });
});