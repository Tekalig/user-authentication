# User Authorization

## Overview
This project provides a robust user authorization system. It includes features such as user registration, login, password management, role-based access control, and email verification.

## Features
- User Registration
- User Login
- Password Reset
- Role-Based Access Control
- Token-Based Authentication
- Email Verification

## Project Structure
The project is divided into two main folders:
- `client`: Contains the frontend code.
- `server`: Contains the backend code.

## Setup
To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Tekalig/user-authorization.git
    ```
2. Navigate to the project directory:
    ```bash
    cd user-authorization
    ```
3. Install dependencies for both client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the `server` directory and add the following variables:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

5. Start the development servers:
    ```bash
    # In the client directory
    npm run dev
    # In the server directory
    npm start
    ```

## Usage
After setting up the project, you can use the following endpoints:

- `POST /register` - Register a new user
- `POST /login` - Login a user
- `POST /reset-password` - Reset user password
- `POST /verify-email` - Verify user email
- `GET /profile` - Get user profile (requires authentication)
- `GET /admin` - Access admin area (requires admin role)

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
