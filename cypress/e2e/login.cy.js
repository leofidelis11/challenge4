describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000');
    });
    it('should login successfully', () => {
        cy.get('[data-qa="username-field"]').click().type('alice');
        cy.get('[data-qa="password-label"]').click().type('password123');
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="status-text"]').should('have.text', 'Login successful! Welcome back.');
    });

    it('should return error if password is invalid', () => {
        cy.get('[data-qa="username-field"]').click().type('alice');
        cy.get('[data-qa="password-label"]').click().type('wrongpassword');
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="status-text"]').should('have.text', 'Invalid username or password');
    });

    it('shouldn\'t allow sign in attempt with empty username field', () => {
        
        cy.get('[data-qa="password-label"]').click().type('password123');
        cy.get('[data-qa="login-button"]').click();
        // Check that the form doesn't submit by verifying the username field is still empty
        cy.get('[data-qa="username-field"]').should('have.value', '');
        cy.get('[data-qa="password-field"]').should('have.value', 'password123');
        // Verify no success message appears (form submission was prevented)
        cy.get('[data-qa="status-text"]').should('not.be.visible');
    });

    it('shouldn\'t allow sign in attempt with empty password field', () => {
        
        cy.get('[data-qa="username-field"]').click().type('charlie');
        cy.get('[data-qa="login-button"]').click();
        cy.get('[data-qa="username-field"]').should('have.value', 'charlie');
        cy.get('[data-qa="password-field"]').should('have.value', '');
        cy.get('[data-qa="status-text"]').should('not.be.visible');
    });
[]
    it('should return error if account is blocked due too many failed login attempts', () => {
        cy.get('[data-qa="username-field"]').type('dave');
        cy.get('[data-qa="password-label"]').click().type('wrongpassword');
        Cypress._.times(3, () => {
            cy.get('[data-qa="login-button"]').click();
          });
        cy.get('[data-qa="status-text"]').should('have.text', 'Account is blocked due to too many failed attempts');
    });
});