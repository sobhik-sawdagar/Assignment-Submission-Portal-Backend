# Assignment Submission Portal - Backend System

Welcome to the **Assignment Submission Portal** backend system. This backend API allows users to register, submit assignments, and tag admins for review. Admins can manage assignments, accept/reject them with remarks, and view user details.

## Flow Diagram
![flowdiagram](https://github.com/user-attachments/assets/4faf05f0-af2c-4e0a-b51b-07627d446f9b)



## -> Hosted Project for Direct Testing 

(**Note:** For installing the project locally and other details please refer below:)

If you do not want to set up the project locally and prefer testing the endpoints directly, you can use the hosted version of this project.

### Hosted URL:

*Note:* As it is hosted on Render's free tier, the machine spins down during inactivity. Therefore, the first visit to the URL may take a few seconds to load. Please be patient.

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

## A Few Examples of How to test the endpoints by sending data: 
1. User Registration:
In Request Body - We send the JSON Data as below:
```json
{
    "username" : "testuser01",
    "email" : "test01@yahpp.com",
    "password" : "test@123"
}
```
![image](https://github.com/user-attachments/assets/9c64f59a-b438-43cf-a201-89ee2b1940c0)


2. User Login:
We log in using the registered email and password and after successful login, a Token has been generated for us as shown below, we have to enter this token in the Authorization section, Choose Auth Type as Bearer Token and Paste the Token in the Token field.[Shown Below] further access authenticated user endpoints like /user/upload, etc.

![image](https://github.com/user-attachments/assets/a751cce5-08af-4434-94e6-8a25674e93fb)

![image](https://github.com/user-attachments/assets/83ebc4a3-7d97-4188-a92d-738aa64f4a06)

*Note:* There is a similar process for Admin Registration, Login, and Token Generation to access the authenticated admin endpoints; here, we will only use the username and password.

3. Upload an assignment:
You can upload the assignment by sending the "task" and "adminId" in the request body, "task" is the assignment name and the "adminId" is being sent to tag the particular admin to this assignment.
```json
{
    "task" : "Backend Application using Rust",
    "adminId" : "6709763efde1c4d7bc8517e4"
}
```
![image](https://github.com/user-attachments/assets/eecb880e-b65e-4c43-8631-3189490d8ad4)

Tip: You can fetch the registered admin's object ID to upload any assignment from the list of admins -> /user/admins.

4. Admin can accept or reject an assignment assigned to them:
To accept or reject an assignment assigned to an admin, send a remark in the request body and then only the assignment will accepted or rejected.
```json
{
    "remark": "Good job, You have maintained good code readability"
}
```
![image](https://github.com/user-attachments/assets/92a0b8bc-df54-4df7-b5ab-a9b4180b5937)

Tip: To obtain the assignment object ID, the admin can navigate to /admin/assignments to retrieve the assignment details.

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
git clone https://github.com/sobhik-sawdagar/Assignment-Submission-Portal-Backend.git
cd Assignment-Submission-Portal-Backend
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
Ensure that MongoDB is running. If you are using a local instance, please refer to the internet for installation instructions based on your operating system.

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
