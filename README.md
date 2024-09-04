# Todo Application

## Overview

This project is a full-stack Todo application built using React and NestJs. It allows users to create, manage, and prioritize tasks. The project includes user authentication and authorization, ensuring that tasks are secure and only accessible to the authenticated user.

## Technologies Used

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: JWT (JSON Web Tokens)


### Backend
- **Framework**: NestJS
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Features

- **User Authentication**: Secure user login and registration using JWT.
- **Task Management**: Create, update, delete, and view tasks.
- **Task Prioritization**: Sort tasks by priority.
- **User Authorization**: Ensures tasks are accessible only by the authenticated user.
- **Reminder**: Send user reminder of their task before 24 hour of it's deadline.

## Getting Started

### Prerequisites

- Node.js
- npm 

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Gargeeshah/todoapp-fullstack.git
    cd todo-app
    ```

2. **Install frontend dependencies**:
    ```bash
    cd todo-frontend
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    cd ../todo-backend
    npm install
    ```

### Running the Application

1. **Start the backend server**:
    ```bash
    cd todo-backend
    npm run start:dev
    ```

2. **Start the frontend development server**:
    ```bash
    cd ../todo-frontend
    npm run dev
    ```

3. **Open your browser and navigate to**: `http://localhost:5173`

## Project Structure

### Frontend

The frontend is built using React. Tailwind CSS is used for styling, providing a responsive and modern user interface. 
Redux Toolkit manages the application state, ensuring efficient state management and easy scalability.

### Backend

The backend is built using NestJS, a progressive Node.js framework. MongoDB is used as the database, and Mongoose as the ORM for interacting with MongoDB. 
JWT is implemented for secure user authentication and authorization.


## API Endpoints

### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login a user and receive a JWT

### Tasks
- **GET** `/task` - Get all tasks for the authenticated user
- **POST** `/task` - Create a new task
- **PATCH** `/task/:id` - Update an existing task
- **DELETE** `/task/:id` - Delete a task

## Environment Variables

### Frontend

Create a `.env` file in the frontend directory with the following variables:

### Backend

Create a `.env` file in the backend directory with the following variables:

```
JWT_SECRET=key
JWT_EXPIRES_IN=30d
MONGO_URI=mongodb://127.0.0.1:27017/todo-app
```






