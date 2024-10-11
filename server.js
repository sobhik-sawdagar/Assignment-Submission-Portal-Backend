const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { handleError } = require("./utilities/errorHandler");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("./database/db");

app.get("/", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Assignment Submission Portal</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f7f8;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              text-align: center;
              background-color: white;
              padding: 50px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              font-size: 1.1rem;
              color: #666;
            }
            h2 {
              color: #555;
              margin-top: 30px;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              background-color: #e9ecef;
              margin: 10px 0;
              padding: 10px;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            li:hover {
              background-color: #d4d8da;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Assignment Submission Portal's Backend System</h1>
            <p>Please test all the endpoints/routes in any API Testing service like Postman</p>
            
            <h2>Endpoints for User:</h2>
            <ul>
              <li>POST /user/register</li>
              <li>POST /user/login</li>
              <li>POST /user/upload</li>
              <li>GET /user/admins</li>
              <li>GET /user/assignments</li>
            </ul>
            
            <h2>Endpoints for Admin:</h2>
            <ul>
              <li>POST /admin/register</li>
              <li>POST /admin/login</li>
              <li>GET /admin/assignments</li>
              <li>POST /admin/assignments/:id/accept</li>
              <li>POST /admin/assignments/:id/reject</li>
            </ul>
          </div>
        </body>
      </html>
    `);
});

//Middleware to parse the request body as JSON
app.use(bodyParser.json());

//Middleware to parse the request body as URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

//Import the routes from the routes folder
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

//Use the routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
