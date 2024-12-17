# Real-Time 1-on-1 Chat App

This project is a real-time 1-on-1 chat application built with React, Node.js, Express, MongoDB, and WebSocket. The application includes authentication, real-time messaging, and a simple user interface.

This project is built using Node v18.18.2

## Table of Contents

- Features
- Project Structure
- Installation
- Running the Application
- API Endpoints
- WebSocket Events
- Technologies Used
- License

## Features

- User registration and login
- Real-time messaging
- Protected routes for authenticated users
- User-friendly interface

## Project Structure

```
messenger-app/
    package.json
    public/
    src/
    tsconfig.json
services/
    auth/
        package.json
        src/
        tsconfig.json
    chat/
        package.json
        src/
        tsconfig.json
    db/
        index.ts
    package.json
```

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/messenger-app.git
cd messenger-app
```

2. Install dependencies for the frontend:

```sh
cd messenger-app
npm install
```

3. Install dependencies for the backend services:

```sh
cd services/auth
npm install

cd ../chat
npm install

cd ../..
```

4. Set up MongoDB:

Ensure you have MongoDB installed and running on your machine. The default connection string is `mongodb://localhost:27017/nodechat-app`.

## Running the Application

1. Start the authentication service:

```sh
cd services/auth
npm run dev
```

2. Start the chat service:

```sh
cd ../chat
npm run dev
```

3. Start the frontend:

```sh
cd ../../messenger-app
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## API Endpoints

### Authentication Service

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user

### Chat Service

- `GET /chat/users`: Get all users
- `GET /chat/messages`: Get messages between two users
- `POST /chat/messages`: Send a message

## WebSocket Events

### Client-Side

- `connect(url: string)`: Connect to the WebSocket server
- `sendMessage(message: string)`: Send a message to the WebSocket server
- `close()`: Close the WebSocket connection

### Server-Side

- `message`: Handle incoming messages
- `drain`: Handle backpressure
- `close`: Handle WebSocket disconnection

## Technologies Used

- Frontend: React, TypeScript, Material-UI, Zustand
- Backend: Node.js, Express, TypeScript, WebSocket, Mongoose
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Real-Time Communication: Socket.io

## Frontend

The frontend of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Backend Services

### Authentication Service

The authentication service handles user registration, login, and authentication. It uses JWT tokens to manage user sessions securely.

### Chat Service

The chat service manages real-time messaging between users. It uses WebSockets to enable instant communication and ensures messages are delivered reliably.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
