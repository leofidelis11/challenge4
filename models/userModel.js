class UserModel {
    constructor() {
        this.users = [
            { username: 'alice', password: 'password123', email: 'alice@example.com' },
            { username: 'bob', password: 'password123', email: 'bob@example.com' },
            { username: 'charlie', password: 'password123', email: 'charlie@example.com' },
            { username: 'diana', password: 'password123', email: 'diana@example.com' }
        ];
    }

    validateLoginData(username, password) {
        const errors = [];
        
        if (!username || username.trim() === '') {
            errors.push('Username is required');
        }
        
        if (!password || password.trim() === '') {
            errors.push('Password is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    validateEmail(email) {
        const errors = [];
        
        if (!email || email.trim() === '') {
            errors.push('Email is required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    getAllUsers() {
        return this.users;
    }
}

module.exports = UserModel; 