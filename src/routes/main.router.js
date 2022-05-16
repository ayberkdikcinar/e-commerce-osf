const express = require('express');
const mainRouter = express.Router();
const mainController = require('./main.controller')

mainRouter.get('/', mainController.renderIndexWithInitialCategoryData);

module.exports = mainRouter;