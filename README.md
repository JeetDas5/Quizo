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
   cd your-project
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
- Responsive design for mobile and desktop.
- Integration with a database using Prisma.

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


## Endpoints

### 1. Get a Quiz by ID
**Endpoint:**  
```
GET /api/quizzes/{quizId}
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
        "id": "440b0e0c-53cf-4f9f-beff-4877b19a357c",
        "title": "test question 2",
        "description": "test desc 2",
        "userId": "1000",
        "createdAt": "2025-02-14T18:50:07.896Z"
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

### 2. Update a Quiz
**Endpoint:**  
```
PUT /api/quizzes/{quizId}
```
**Description:**  
Updates an existing quiz.

**Request Parameters:**  
- `quizId` (path) - Required, the unique ID of the quiz.

**Request Body:**
```json
{
    "title": "updated title",
    "description": "updated description"
}
```

**Response:**  
```json
{
    "quiz": {
        "id": "26d11ac1-2a33-46e0-adda-044c0fa9aa90",
        "title": "updated title",
        "description": "updated description",
        "userId": "1000",
        "createdAt": "2025-02-14T10:31:50.604Z"
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

### 3. Delete a Quiz
**Endpoint:**  
```
DELETE /api/quizzes/{quizId}
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

### 4. Get All Quizzes for a User
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
            "id": "440b0e0c-53cf-4f9f-beff-4877b19a357c",
            "title": "test question 2",
            "description": "test desc 2",
            "userId": "1000",
            "createdAt": "2025-02-14T18:50:07.896Z"
        },
        {
            "id": "c96c062d-d5d3-4040-9348-d120e7914bbf",
            "title": "test question 3",
            "description": "test desc 3",
            "userId": "1000",
            "createdAt": "2025-02-14T18:50:12.924Z"
        },
        {
            "id": "787f31cf-f5fe-4596-8ff9-e752d26e3ffe",
            "title": "test question 4",
            "description": "test desc 4",
            "userId": "1000",
            "createdAt": "2025-02-14T18:50:18.973Z"
        },
        {
            "id": "8860c687-8f0b-4cd3-92eb-76a693807bea",
            "title": "test question 5",
            "description": "test desc 5",
            "userId": "1000",
            "createdAt": "2025-02-14T18:50:24.027Z"
        },
        {
            "id": "59702d19-416b-461b-bc9f-58d887cfd601",
            "title": "what is the capital of India",
            "description": "give a brief description about india\n",
            "userId": "1000",
            "createdAt": "2025-02-14T19:11:58.318Z"
        },
        {
            "id": "f0c0cea3-c934-41f5-8d33-c2e21f977de4",
            "title": "updated title new",
            "description": "updated description",
            "userId": "1000",
            "createdAt": "2025-02-14T18:50:00.480Z"
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

| Status Code | Message                  | Description                           |
|-------------|--------------------------|---------------------------------------|
| 404         | "Quiz not found"         | The requested quiz does not exist.   |
| 500         | "Server error"           | Something went wrong on the server.  |

---

## Rate Limits

Currently, no rate limits are enforced.

---

This API documentation provides an overview of how to interact with the Quiz Management system. If you have any issues, feel free to contact the developer.


