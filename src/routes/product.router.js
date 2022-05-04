const express = require('express');
const productRouter = express.Router();
const productController = require('./product.controller')

productRouter.get('/', productController.getProductByCategoryId);
productRouter.get('/single', productController.getProductById);

module.exports = productRouter;