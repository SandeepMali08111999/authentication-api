
Express Authentication API This is a simple authentication API built with Express.js and MongoDB. It provides endpoints for user registration, login, and fetching user data. JSON Web Tokens (JWT) are used for authentication.

1=>Table of Contents Installation Usage Endpoints Environment Variables Contributing License

2=>Installation

Clone the repository: bash Copy code git clone https://github.com/your-username/express-authentication-api.git

Install dependencies: bash Copy code cd express-authentication-api npm install

3=>Set up environment variables:Create a .env file in the root directory of the project and add the following variables: Copy code PORT=8080 MONGODB_URI= SECRET=

Usage To start the server, run:

bash Copy code npm start The server will start listening on the port specified in the .env file.

Endpoints User Registration URL: /auth/register Method: POST Body: fullName: User's full name (string) email: User's email address (string) password: User's password (string) Success Response: Code: 200 Content: { message: "User registered successfully.", data: { _id, fullName, email, createdAt } } Error Response: Code: 400 Content: { message: "Bad Request", error: {...} }

User Login URL: /auth/login Method: POST Body: email: User's email address (string) password: User's password (string) Success Response: Code: 200 Content: { jwtToken, user: { _id, fullName, email } } Error Response: Code: 401 Content: { message: "Authentication failed. Invalid email or password." }

Get User Data URL: /auth/user Method: GET Headers: Authorization: Bearer token Success Response: Code: 200 Content: { data: [{ _id, fullName, email, createdAt }, ...] }

Error Response: Code: 403 Content: { message: "Token is required" }

Environment Variables PORT: Port number on which the server will run. MONGODB_URI: MongoDB connection URI. SECRET: Secret key used for JWT token generation.

Contributing Contributions are welcome! Feel free to open issues or submit pull requests.

License This project is licensed under the MIT License.
