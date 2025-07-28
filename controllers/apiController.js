const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const ApiService = require('../services/apiService');

const userModel = new UserModel();
const apiService = new ApiService();

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input data
        const validation = userModel.validateLoginData(username, password);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }

        // Call external API
        const result = await apiService.login(username, password);
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Login successful',
                data: result.data
            });
        } else {
            res.status(result.status).json({
                success: false,
                message: result.error.message || 'Login failed',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        const validation = userModel.validateEmail(email);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }

        // Call external API
        const result = await apiService.forgotPassword(email);
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Password reset email sent',
                data: result.data
            });
        } else {
            res.status(result.status).json({
                success: false,
                message: result.error.message || 'Password reset failed',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// API health check endpoint
router.get('/health', async (req, res) => {
    try {
        const result = await apiService.checkApiHealth();
        res.json({
            success: result.success,
            message: result.success ? 'API is healthy' : 'API is not responding',
            error: result.error
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Health check failed',
            error: error.message
        });
    }
});

// Get available users (for demo purposes)
router.get('/users', (req, res) => {
    try {
        const users = userModel.getAllUsers();
        res.json({
            success: true,
            data: users.map(user => ({
                username: user.username,
                email: user.email
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get users',
            error: error.message
        });
    }
});

module.exports = router; 