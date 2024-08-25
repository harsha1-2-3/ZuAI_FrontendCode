# Project Name

ZuAI Assignment on Posts.

A web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on posts. This project is designed to showcase basic CRUD functionalities and searching the posts based their title using [the technologies used, e.g., React, Node.js, Express, etc.].

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [License](#license)

## Features

- Create, read, update, and delete posts and.
- Responsive user interface for managing content.
- RESTful API for server-side operations.
- Basic Error handling used for both Backend and Frontend.

## Technologies Used

- **Frontend**: [e.g., React, HTML, CSS]
- **Backend**: [e.g., Node.js, Express]
- **Database**: [e.g., sqlite, sqlite3]
- **Other**: [e.g., fetch,]

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone [https://github.com/harsha1-2-3/Zuai_Frontend.git](https://github.com/harsha1-2-3/ZuAI_FrontendCode)
   ```

2. **Navigate to the project directory**:

   ```bash
   cd src
   ```

3. **Install dependencies**:

   For the backend:

   ```bash
   cd backend
   npm install express sqlite sqlite3 cors dotenv
   ```

   For the frontend:

   ```bash
   cd frontend
   npm install react-router-dom react-icons react-loader-spinner
   ```

4. **Start the development server**:

   For the backend:

   ```bash
   node server.js
   ```

   For the frontend:

   ```bash
   cd src
   npm start
   ```

   The application will be available at `https://zuaipostsproject.netlify.app/`.

## Usage

1. **Create a new post**: Use the form provided on the UI to create a new post.
2. **View all posts**: Navigate to the home page and click "see all posts" to see a list of all posts.
3. **Update a post**: Click on the edit button in post to update its content.
4. **Delete a post**: Click on the delete button next to a post to remove it.

## API Endpoints

### Posts

- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Retrieve a single post by ID
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

_To create a post must fill all the field_

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
