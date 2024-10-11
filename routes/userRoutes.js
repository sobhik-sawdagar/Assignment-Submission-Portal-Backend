const express = require('express'); 
const router = express.Router();
const userAuth = require('../authentication/jwt/userAuth');
const userController = require('../controllers/userController');
const {check} = require('express-validator'); //Validation middleware

//Routes
router.post('/register', [
    check('username', 'Username is required').notEmpty(), //Check if the username is empty
    check('email', 'Please include a valid email').isEmail(), //Check if the email is valid
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), //Check if the password is at least 6 characters
  ], userController.register); //Register a new user

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ], userController.login); //Login a user

router.post('/upload', userAuth, userController.upload); //Upload an assignment by a user

router.get('/admins', userAuth, userController.admins); //Fetch all admins

router.get('/assignments', userAuth, userController.myAssignments); //Fetch assignments by logged in user

module.exports = router;