describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000');
    });
    it('should login successfully', () => {
        cy.get('#username').type('alice');
        cy.get('#loginForm input#password').click({ force: true }).type('password123');

        cy.contains('button', 'Login').click();

        cy.get('#status-text').should('have.text', 'Login successful! Welcome back.');
    });

    it('Should fail to login with incorrect password', () => {
        cy.get('#username').type('alice');
        cy.get('#loginForm input#password').click({ force: true }).type('wrongpassword');

        cy.contains('button', 'Login').click();

        cy.get('#status-text').should('have.text', 'Invalid username or password');
    });

    it('Should fail to login with incorret username', () => {
        cy.get('#username').type('invalidUser');
        cy.get('#loginForm input#password').click({ force: true }).type('password123');

        cy.contains('button', 'Login').click();

        cy.get('#status-text').should('have.text', 'Invalid username or password');
    });
});