const express = require('express'); 
const router = express.Router();
const adminAuth = require('../authentication/jwt/adminAuth');
const adminController = require('../controllers/adminController');
const {check} = require('express-validator');

//Routes
router.post('/register', [
    check('username', 'Username is required').notEmpty(), //Check if the username is empty
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), //Check if the password is at least 6 characters
  ], adminController.register); //Register a new admin

router.post('/login', [
    check('username', 'Please include a username').notEmpty(), //Check if the username is valid
    check('password', 'Password is required').exists(), //Check if the password is required
  ], adminController.login); //Login an admin

router.get('/assignments', adminAuth, adminController.assignments); //Fetch assignments by logged in admin

router.post('/assignments/:id/accept', adminAuth, adminController.accept); //Accept an assignment with a remark by an admin

router.post('/assignments/:id/reject', adminAuth, adminController.reject); //Reject an assignment with a remark by an admin

module.exports = router;