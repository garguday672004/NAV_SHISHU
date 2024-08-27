const express = require('express');
const router = express.Router();

const {sendOtp, signup, login, changePassword} = require('../controllers/Auth');

const {auth} = require('../middlewares/auth');

router.post('/test',auth, (req, res) => {
    res.send('This is a protected route for test');
})

// Route for user login
router.post('/login',login);

// Route for user signup
router.post('/signup',signup);

// Route for sending OTP to the user's email
router.post('/sendOtp',sendOtp);

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// TODO: reset Password routes to be added here

// console.log('connected to user routes')

module.exports = router;