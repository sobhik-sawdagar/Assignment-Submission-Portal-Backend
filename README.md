# Assignment Submission Portal - Backend System

Welcome to the **Assignment Submission Portal** backend system. This backend API allows users to register, submit assignments, and tag admins for review. Admins can manage assignments, accept/reject them with remarks, and view user details.

## Flow Diagram
![flowdiagram](https://github.com/user-attachments/assets/4faf05f0-af2c-4e0a-b51b-07627d446f9b)



## -> Hosted Project for Direct Testing 

(**Note:** For installing the project locally and other details please refer below:)

If you do not want to set up the project locally and prefer testing the endpoints directly, you can use the hosted version of this project.

### Hosted URL:

[Assignment Submission Portal - Backend](https://assignment-submission-portal-backend.onrender.com/) - https://assignment-submission-portal-backend.onrender.com/


### Available Endpoints

You can test the following endpoints directly on the hosted project using **Postman** or any API testing tool:

#### User Endpoints:

1. **POST** `/user/register`

   Register a new user with traditional authentication.

2. **POST** `/user/login`

   User login using username and password.

3. **POST** `/user/upload`

   Submit an assignment and tag an admin.

4. **GET** `/user/admins`

   Get a list of admins.

5. **GET** `/user/assignments`

   View all assignments submitted by the user.

#### Admin Endpoints:

1. **POST** `/admin/register`

   Register a new admin.

2. **POST** `/admin/login`

   Admin login using username and password.

3. **GET** `/admin/assignments`

   View assignments tagged to the logged-in admin.

4. **POST** `/admin/assignments/:id/accept`

   Accept a tagged assignment and add remarks.

5. **POST** `/admin/assignments/:id/reject`

   Reject a tagged assignment and add remarks.

### Authentication

- You will need a **JWT token** for protected routes such as `/user/admins` and `/admin/assignments`.
- After logging in, copy the token from the response and include it in the request headers as shown below:

```bash
Authorization: Bearer <your_jwt_token>
```

## Features
- **User Registration & Login** 
- **Admin Registration & Login**
- **Assignment Submission by User** (with Admin tagging)
- **Assignment Review by Admin** (Accept/Reject with remarks)
- **Session Management** using JWT Tokens

---

## Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - For session management and authentication
- **Postman** - For API testing

---

## Prerequisites
Ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (running locally or use MongoDB Atlas)

---

## Installation (For Testing in Your Local System)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/assignment-submission-portal.git
cd assignment-submission-portal
```
### 2. Install Dependencies
Run the following command to install all the necessary dependencies:

```bash
npm install
```
### 3. Environment Variables
Create a .env file in the root directory of your project and add the following variables

```bash
# Server Port
PORT=3000

# MongoDB URI
MONGODB_URL=mongodb://localhost:27017/assignment_portal

# JWT Secret
JWT_SECRET=your_jwt_secret
```
### 4. Database Setup
Make sure MongoDB is running. If you are using a local instance, simply start MongoDB with the following command:

#### For MongoDB Atlas (cloud-based):

Create a MongoDB Atlas cluster and get your connection URI.
Replace MONGODB_URL in your .env file with your Atlas connection string.

## 5. Running the Application
1. Start the Server
To start the backend server, run the following command:
```bash
npm start server.js
```
The server should now be running at http://localhost:3000.

2. API Testing
 - Use Postman or any other API testing tool to test the endpoints.
 - Navigate to http://localhost:3000/ in the browser to see the welcome page.

## 5. API Endpoints
### User Endpoints

1. POST /user/register

   Register a new user with traditional authentication.

2. POST /user/login

   User login using username and password.

3. POST /user/upload

   Submit an assignment and tag an admin.

4. GET /user/admins

   Get a list of admins.

5. GET /user/assignments

   View all assignments submitted by the user.

### Admin Endpoints

1. POST /admin/register

   Register a new admin.

2. POST /admin/login

   Admin login using username and password.

3. GET /admin/assignments

   View assignments tagged to the logged-in admin.

4. POST /admin/assignments/:id/accept

   Accept a tagged assignment and add remarks.

5. POST /admin/assignments/:id/reject

   Reject a tagged assignment and add remarks.
   
## 6. Testing
### Testing with Postman
1. Open Postman or any other API testing service.
2. Use the provided API routes to test registration, login, assignment submissions, and admin review.
3. Include the JWT token in the headers for protected routes like /user/admins, /admin/assignments, etc.
     
Sample headers for authenticated requests:
```bash
Authorization: Bearer <your_jwt_token>
```
