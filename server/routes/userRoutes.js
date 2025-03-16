const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const UserModel = require('../model/GoExplore.UserModel/UserModel');
const passport = require('passport');
const { body } = require('express-validator'); 
// Registration
routes.post('/register', userController.registrationUser);

// Sign in
routes.post('/signin', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ], userController.signin);
// Profile
routes.get('/profile', userController.profile);

// Update User
routes.put('/update/:id', userController.updateUser);

// Admin logout
routes.get('/logout', userController.UserLogout);
//delete User
routes.delete('/delete/:id',userController.deleteUser)
// Forget password
routes.post('/send-email', userController.sendEmail);
// Forget password
routes.post('/forget-password', userController.forgetPassword);

// Fail Login
routes.get('/fail-login', async (req, res) => {
    try {
        res.status(200).json({ msg: "User Failed Login.." });
    } catch (err) {
        res.status(400).json({ msg: "Something is wrong", error: err });
    }
});

module.exports = routes;