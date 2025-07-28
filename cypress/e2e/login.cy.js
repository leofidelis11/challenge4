describe('Login', () => {
    it('should login successfully', () => {
        cy.visit('http://localhost:4000');
        cy.get('#username').type('alice');
        cy.get('#loginForm input#password').click({force: true}).type('password123');

        cy.contains('button', 'Login').click();

        cy.get('#status-text').should('have.text', 'Login successful! Welcome back.');
    });
});