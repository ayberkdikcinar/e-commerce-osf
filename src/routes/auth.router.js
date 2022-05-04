const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.controller')

authRouter.get('/signup', authController.renderSignUpPage);
authRouter.get('/signin', authController.renderSingInPage);
authRouter.post('/signUp', authController.postSignUp);
authRouter.post('/signIn', authController.postSignIn);
module.exports = authRouter;