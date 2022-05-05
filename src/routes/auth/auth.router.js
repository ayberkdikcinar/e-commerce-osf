const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.controller')

authRouter.get('/signup', authController.renderSignUpPage);
authRouter.get('/signin', authController.renderSingInPage);
authRouter.post('/signup', authController.postSignUp);
authRouter.post('/signin', authController.postSignIn);
module.exports = authRouter;