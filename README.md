# Quizo

This is Quiz Management System named Quizo, a platform where teachers can create, manage, and view their quizzes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Provide step-by-step instructions on how to install and set up your project. For example:

1. Clone the repository:
   ```bash
   git clone https://github.com/JeetDas5/Quizo
   ```
2. Navigate to the project directory:
   ```bash
   cd Quizo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables as specified in `.env.example`.

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

Explain how to use your project after installation. Include code snippets, examples, or screenshots to illustrate:

- Access the application at `http://localhost:3000`.
- To create a new quiz, click on the "Create Quiz" button and fill out the form.
- To edit or delete an existing quiz, use the "Edit" or "Delete" buttons next to each quiz.

## Features

Highlight the key features of your project:

- User authentication and authorization.
- Create, read, update, and delete quizzes.
- Responsive design for mobile and desktop with shadcn.
- Integration with a database using Prisma.

## Technologies Used

- Next.js
- Node.js
- Prisma
- PostgreSQL
- Tailwind CSS
- Typescript


## Contributing

Provide guidelines for contributing to your project:

1. Fork the repository.

2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

Specify the license under which your project is distributed. For example:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Provide ways for users to reach out with questions or feedback:

- Email: jeet15083011@gmail.com
- GitHub: [JeetDas5](https://github.com/JeetDas5)

---

# Quiz Management API Documentation

## Introduction

This API allows users to manage quizzes by creating, retrieving, updating, and deleting quizzes.

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

This API requires authentication via JWT tokens. Include your token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 1. User Authentication

#### 1.1 Register a New User

**Endpoint:**
```
POST /api/register
```
**Description:**
Registers a new user.

**Request Body:**
```json
{
  "username": "teacher",
  "password": "password"
}
```

**Response:**
```json
{
    "message": "User registered successfully",
    "user": {
        "id": "87b54f53-a2d1-40ce-bf0f-a41a6e44ad80",
        "username": "jeet",
        "password": "jeetdas"
    }
}
```

**Error Responses:**
```json
{
  "error": "Username already exists"
}
```

#### 1.2 User Login

**Endpoint:**
```
POST /api/login
```
**Description:**
Authenticates a user and returns a session.

**Request Body:**
```json
{
  "username": "teacher",
  "password": "password"
}
```

**Response:**
```json
{
  "message": "Login successful",
}
```

**Error Responses:**
```json
{
  "error": "Invalid credentials"
}
```

---
### Quiz

### 2.1 Create a Quiz

**Endpoint:**
```
POST /api/quizzes
```
**Description:**
Creates a new quiz.

**Request Body:**
```json
{
  "title": "Sample Quiz",
  "description": "A test quiz",
  "userId": "1000"
}
```

**Response:**
```json
{
    "success": true,
    "quiz": {
        "id": "f5a21fe1-cf12-4628-8b29-6bf47f367815",
        "title": "test question 2",
        "description": "test desc 2",
        "userId": "1000",
        "createdAt": "2025-02-14T10:34:21.232Z"
    }
}
```

---

### 2.2 Get All Quizzes

**Endpoint:**
```
GET /api/quizzes
```
**Description:**
Retrieves all available quizzes.

**Response:**
```json
{
  "success": true,
  "quizzes": [
    {
      "id": "123",
      "title": "Sample Quiz",
      "description": "A test quiz"
    },
    {
      "id": "124",
      "title": "Another Quiz",
      "description": "Another test quiz"
    }
  ]
}
```

---

### 2.3 Get a Quiz by ID

**Endpoint:**
```
GET /api/quiz/{quizId}
```
**Description:**
Retrieves a quiz by its unique ID.

**Request Parameters:**
- `quizId` (path) - Required, the unique ID of the quiz.

**Response:**
```json
{
  "success": true,
  "quiz": {
    "id": "123",
    "title": "Sample Quiz",
    "description": "A test quiz",
    "userId": "user123"
  }
}
```

**Error Responses:**
```json
{
  "error": "Quiz not found"
}
```

---

### 2.4 Update a Quiz

**Endpoint:**
```
PUT /api/quiz/{quizId}
```
**Description:**
Updates an existing quiz.

**Request Parameters:**
- `quizId` (path) - Required, the unique ID of the quiz.

**Request Body:**
```json
{
  "title": "Updated Quiz Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "quiz": {
    "id": "123",
    "title": "Updated Quiz Title",
    "description": "Updated description"
  }
}
```

**Error Responses:**
```json
{
  "error": "Quiz not found"
}
```

---

### 2.5 Delete a Quiz

**Endpoint:**
```
DELETE /api/quiz/{quizId}
```
**Description:**
Deletes a quiz by ID.

**Request Parameters:**
- `quizId` (path) - Required, the unique ID of the quiz.

**Response:**
```json
{
  "message": "Quiz deleted successfully"
}
```

**Error Responses:**
```json
{
  "error": "Quiz not found"
}
```

---

### 2.6 Get All Quizzes for a User

**Endpoint:**
```
GET /api/user-quizzes/{userId}
```
**Description:**
Retrieves all quizzes created by a specific user.

**Request Parameters:**
- `userId` (path) - Required, the unique ID of the user.

**Response:**
```json
{
  "success": true,
  "quizzes": [
    {
      "id": "123",
      "title": "Sample Quiz",
      "description": "A test quiz",
      "userId": "user123"
    },
    {
      "id": "124",
      "title": "Another Quiz",
      "description": "Another test quiz",
      "userId": "user123"
    }
  ]
}
```

**Error Responses:**
```json
{
  "error": "Failed to fetch quizzes"
}
```

---

## Error Handling

| Status Code | Message          | Description                         |
| ----------- | ---------------- | ----------------------------------- |
| 400         | "Invalid input"  | The provided data is incorrect.    |
| 401         | "Unauthorized"   | Authentication is required.        |
| 404         | "Quiz not found" | The requested quiz does not exist.  |
| 500         | "Server error"   | Something went wrong on the server. |

---

## Rate Limits

Currently, no rate limits are enforced.

---

This API documentation provides an overview of how to interact with the Quiz Management system. If you have any issues, feel free to contact the developer.

