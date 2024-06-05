# My Blog

Welcome to My Blog! This is a simple blog post API server where you can read, create, update, and delete blog posts.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- **`DATABASE_URL`**: The URL of the Mysql database link.
- **`JWT_SECRET`**: Secret Key for JWT Token.

## Features

- **Create**: Easily create new blog posts with a title and content.
- **Read**: Browse through existing blog posts to read and enjoy.
- **Update**: Edit and update your own blog posts as needed.
- **Delete**: Remove blog posts that you no longer want to keep.

## Technologies Used

- **Backend**: Express.js
- **Database**: MySql
- **ORM**: Prisma


## Setup

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Prisam Setup :`npm prisma generate`
4. Start the development server: `npm start`.


## API Endpoints

### Base URL

All API requests should be made to the following base URL:


### Available Endpoints

#### Post
- **GET /post**: Retrieve all blog posts.
- **POST /post**: Create a new blog post.
- **GET /post/{id}**: Retrieve a specific blog post by its ID.
- **PUT /post/{id}**: Update a specific blog post by its ID.
- **DELETE /post/{id}**: Delete a specific blog post by its ID.
-

#### Auth
- **POST /auth/signup**: Signup admin account.
- `{
    "name":"admin",
    "email":"admin1@gmail.com",
    "password":"admin"
}`
- **POST /auth/login**: Admin Login
- `{
    "email":"admin1@gmail.com",
    "password":"admin"
}`

For detailed information about each endpoint, including request and response formats, authentication requirements, and example requests and responses, please refer to the API documentation.
