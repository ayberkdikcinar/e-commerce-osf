const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('./category.controller')

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryDataWithParent);
categoryRouter.get('/parent/:id', categoryController.getCategoryDataWithParent);


module.exports = categoryRouter;