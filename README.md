# Challenge 4: Login Web Application

A responsive web application that consumes the login API from [Challenge 3](https://github.com/leofidelis11/challenge3). Built with HTML, CSS, JavaScript, Express.js, and MaterializeCSS following the MVC design pattern.

## Contributors

- [David Costa Souto](https://github.com/davidcsouto)
- [Isabelle Faria](https://github.com/CodeIsa)
- [Karina Nascimento](https://github.com/karinaNascimento100)
- [Leonardo Fidelis](https://github.com/leofidelis11)
- [Lucas Dias](https://github.com/DiasLuc)

## Features

- **Login System**: Connect to external API for authentication
- **Forgot Password**: Password recovery functionality
- **User Management**: View available test users
- **API Health Monitoring**: Real-time API status checking
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Form Validation**: Client-side and server-side validation
- **Modern UI**: Beautiful interface using MaterializeCSS

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: MaterializeCSS
- **Backend**: Express.js (Node.js)
- **HTTP Client**: Axios
- **Architecture**: MVC (Model-View-Controller) Pattern

## Project Structure

```
Challenge4/
├── models/
│   └── userModel.js          # Data models and validation
├── services/
│   └── apiService.js         # External API communication
├── controllers/
│   └── apiController.js      # Business logic and request handling
├── public/
│   ├── index.html            # Main web page
│   ├── css/
│   │   └── style.css         # Custom styles
│   └── js/
│       └── app.js            # Frontend JavaScript
├── server.js                 # Express server
├── package.json              # Dependencies and scripts
├── config.env               # Environment configuration
└── README.md                # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- The Challenge 3 API server running on `http://localhost:3000`

## Installation

1. **Clone or download this project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   - Edit `config.env` file if needed
   - Default API URL: `http://localhost:3000`
   - Default web app port: `4000`

4. **Start the Challenge 3 API server**:
   ```bash
   # Navigate to the Challenge 3 project directory
   cd path/to/challenge3
   npm install
   npm run rest-api
   ```

5. **Start the web application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   - Open your browser and go to `http://localhost:4000`

## Usage

### Login
- Use any of the test users from the API:
  - Username: `alice`, Password: `password123`
  - Username: `bob`, Password: `password123`
  - Username: `charlie`, Password: `password123`
  - Username: `diana`, Password: `password123`

### Forgot Password
- Enter a valid email address that exists in the API
- The API will return a new password (always `newpassword` for demo)

### User List
- View all available test users in the system
- Shows username and email for each user

### API Status
- Real-time monitoring of the external API health
- Shows connection status and response time

## API Endpoints

The web application provides the following endpoints:

- `POST /api/login` - Handle login requests
- `POST /api/forgot-password` - Handle password reset requests
- `GET /api/health` - Check API health status
- `GET /api/users` - Get list of available users

## MVC Architecture

### Model (`models/userModel.js`)
- Data validation logic
- User data structure
- Input validation methods

### View (`public/`)
- HTML templates
- CSS styling
- JavaScript UI interactions

### Controller (`controllers/apiController.js`)
- Request handling
- Business logic coordination
- Response formatting

### Service (`services/apiService.js`)
- External API communication
- HTTP request handling
- Error management

## Development

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Environment Variables
Create a `config.env` file with:
```
API_BASE_URL=http://localhost:3000
PORT=4000
```

## Features in Detail

### Responsive Design
- Mobile-first approach
- MaterializeCSS grid system
- Touch-friendly interface
- Adaptive navigation

### Form Validation
- Real-time client-side validation
- Server-side validation
- Visual feedback for errors
- Loading states during submission

### Error Handling
- Network error detection
- API error responses
- User-friendly error messages
- Graceful degradation

### Security
- Input sanitization
- CORS configuration
- Request validation
- Secure communication with external API

## Testing the Application

1. **Start both servers**:
   - Challenge 3 API: `http://localhost:3000`
   - Challenge 4 Web App: `http://localhost:4000`

2. **Test login functionality**:
   - Try valid credentials (should succeed)
   - Try invalid credentials (should fail)
   - Try multiple failed attempts (should block account)

3. **Test forgot password**:
   - Use valid email addresses
   - Check API response

4. **Test responsive design**:
   - Resize browser window
   - Test on mobile devices
   - Check navigation on different screen sizes

## Troubleshooting

### Common Issues

1. **API Connection Error**:
   - Ensure Challenge 3 API is running on port 3000
   - Check `config.env` file for correct API URL
   - Verify network connectivity

2. **Port Already in Use**:
   - Change port in `config.env` file
   - Kill existing process on port 4000

3. **Module Not Found**:
   - Run `npm install` to install dependencies
   - Check Node.js version (v14+ required)

### Debug Mode
Enable debug logging by adding to `config.env`:
```
DEBUG=true
```

## Contributing

1. Follow the existing code structure
2. Maintain MVC pattern
3. Add proper error handling
4. Test on multiple devices
5. Update documentation

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [MaterializeCSS](https://materializecss.com/) for the UI framework
- [Challenge 3 API](https://github.com/leofidelis11/challenge3) for the backend API
- Express.js team for the web framework
