# Cypress Tests - Challenge 4

This directory contains end-to-end (E2E) automated tests for the Challenge 4 login web application, implemented using the Cypress framework.

## Test Structure

```
cypress/
├── e2e/
│   ├── login.cy.js           # Login functionality tests
│   └── forgotPassword.cy.js  # Password recovery tests
├── support/
│   ├── commands.js           # Custom Cypress commands
│   └── e2e.js               # Global test configurations
└── README.md                # This file
```

## Prerequisites

Before running the tests, make sure that:

1. **Node.js** is installed (version 14 or higher)
2. **Dependencies** are installed:
   ```bash
   npm install
   ```
3. **Challenge 3 API** is running on `http://localhost:3000`
4. **Web application** is running on `http://localhost:4000`

## Environment Setup

### 1. Start the API (Challenge 3)

```bash
# Navigate to the Challenge 3 directory
cd path/to/challenge3
npm install
npm run rest-api
```

### 2. Start the Web Application (Challenge 4)

```bash
# In the Challenge 4 directory
npm start
```

### 3. Verify that services are running

- API: `http://localhost:3000` (should return API data)
- Web App: `http://localhost:4000` (should load the login page)

## Running Tests

### Important: Working Directory

**Make sure you are in the correct directory before running Cypress commands:**

```bash
# Navigate to the Challenge 4 project directory
cd c:\Challenge4\challenge4

# Then run Cypress commands
npx cypress run
```

### Basic Commands

#### 1. Run all tests in headless mode (terminal)

```bash
npx cypress run
```

#### 2. Open Cypress GUI

```bash
npx cypress open
```

#### 3. Run specific tests

```bash
# Run only login tests
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run only forgot password tests
npx cypress run --spec "cypress/e2e/forgotPassword.cy.js"
```

#### 4. Run tests in a specific browser

```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

### Advanced Commands

#### 5. Run with detailed reports

```bash
npx cypress run --reporter spec
```

#### 6. Run in debug mode

```bash
npx cypress run --headed --no-exit
```

#### 7. Run with custom configurations

```bash
npx cypress run --config baseUrl=http://localhost:4000
```

## Adding Scripts to package.json

To make test execution easier, you can add the following scripts to `package.json`:

```json
{
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open",
    "test:login": "cypress run --spec 'cypress/e2e/login.cy.js'",
    "test:forgot": "cypress run --spec 'cypress/e2e/forgotPassword.cy.js'",
    "test:chrome": "cypress run --browser chrome",
    "test:headed": "cypress run --headed"
  }
}
```

After adding the scripts, you can run:

```bash
# Run all tests
npm test

# Open GUI
npm run test:open

# Run only login tests
npm run test:login

# Run only forgot password tests
npm run test:forgot

# Run on Chrome
npm run test:chrome

# Run with visible interface
npm run test:headed
```

## Implemented Tests

### Login Tests (`login.cy.js`)

1. **Login Successful**: Tests login with valid credentials

   - User: `alice`
   - Password: `password123`
   - Expected result: "Login successful! Welcome back."

2. **Login Failed - Wrong Password**: Tests login with incorrect password

   - User: `alice`
   - Password: `wrongpassword`
   - Expected result: "Invalid username or password"

3. **Login Failed - Invalid Username**: Tests login with invalid username

   - User: `invalidUser`
   - Password: `password123`
   - Expected result: "Invalid username or password"

4. **Login Failed - Empty Username**: Tests login with empty username

   - User: `` (empty)
   - Password: `password123`
   - Expected result: Form validation prevents submission, no success message appears

5. **Login Failed - Empty Password**: Tests login with empty password

   - User: `charlie`
   - Password: `` (empty)
   - Expected result: Form validation prevents submission, no success message appears

6. **Login Failed - Account Blocked**: Tests account blocking after multiple failed attempts
   - User: `dave`
   - Password: `wrongpassword`
   - Action: Multiple failed login attempts
   - Expected result: "Account is blocked due to too many failed attempts"

### Forgot Password Tests (`forgotPassword.cy.js`)

1. **Forgot Password Successful**: Provide new password with valid e-mail
   - Email: `grace@example.com`
   - Expected result: "Password reset. Your new password is \"newpassword\"."
  
2. **Forgot Password Failed - Invalid Email**: Display "email not found" message
   - Email: `invalidemail@example.com`
   - Expected result: "Email not found"

## Cypress Configuration

The `cypress.config.js` file in the project root contains basic Cypress configurations. The main configurations include:

- **baseUrl**: Application base URL (can be configured)
- **viewportWidth/Height**: Viewport dimensions for tests
- **defaultCommandTimeout**: Default timeout for commands
- **pageLoadTimeout**: Timeout for page loading

## Debugging and Troubleshooting

### Common Issues

1. **No spec files found error**:

   ```
   Can't run because no spec files were found.
   We searched for specs matching this glob pattern:
   ```

   - **Solution**: Make sure you are in the correct directory (`c:\Challenge4\challenge4`) before running Cypress commands
   - **Alternative**: Use the full path: `npx cypress run --spec "c:\Challenge4\challenge4\cypress\e2e\*.cy.js"`

2. **Application connection error**:

   ```
   Error: ECONNREFUSED connect ECONNREFUSED 127.0.0.1:4000
   ```

   - **Solution**: Verify that the web application is running on `http://localhost:4000`

3. **API not responding**:

   ```
   API health check failed
   ```

   - **Solution**: Verify that the Challenge 3 API is running on `http://localhost:3000`

4. **Elements not found**:
   ```
   Element not found: #username
   ```
   - **Solution**: Verify that the page loaded completely before executing commands

### Debug Mode

To debug specific tests:

1. Add `cy.debug()` to the test
2. Run with `npx cypress run --headed`
3. Use browser developer tools

### Logs and Screenshots

Cypress automatically:

- Takes screenshots on failure
- Records test videos (headless mode)
- Saves detailed logs

Files are saved in:

- Screenshots: `cypress/screenshots/`
- Videos: `cypress/videos/`

## Best Practices

1. **Always wait for elements**: Use `cy.get()` with appropriate timeouts
2. **Use stable selectors**: Prefer specific IDs and classes
3. **Clean state**: Use `beforeEach()` to navigate to initial page
4. **Test real scenarios**: Include UI and UX validations
5. **Organize tests**: Group related tests in `describe()` blocks

## Expanding Tests

To add new tests:

1. Create a new `.cy.js` file in `cypress/e2e/`
2. Follow the existing test pattern
3. Use custom commands when needed
4. Add scripts to `package.json` for easy execution

## Useful Resources

- [Official Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Commands](https://docs.cypress.io/api/table-of-contents)
- [Cypress Examples](https://github.com/cypress-io/cypress-example-kitchensink)

## Contributing

When adding new tests:

1. Follow the existing structure
2. Add explanatory comments
3. Test locally before committing
4. Keep this README updated

---

**Note**: This project uses Cypress v14.5.3. For different versions, some commands may vary. Consult the official documentation for your specific version.

