const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {handleError} = require('./utilities/errorHandler');
const PORT = process.env.PORT || 3000;  
require('dotenv').config();
require('./database/db');  

//Middleware to parse the request body as JSON
app.use(bodyParser.json()); 

//Middleware to parse the request body as URL encoded data
app.use(bodyParser.urlencoded({ extended: true })); 

//Error handling middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

//Import the routes from the routes folder 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

//Use the routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

