const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller')


userRouter.get('/profile', userController.renderProfile);

module.exports = userRouter;