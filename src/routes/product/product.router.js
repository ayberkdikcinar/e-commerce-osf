const express = require('express');
const productRouter = express.Router();
const productController = require('./product.controller')

productRouter.get('/', productController.renderProductPageWithProducts);
productRouter.get('/paginate', productController.getProductByCategoryId);
productRouter.get('/single', productController.renderProductDetailPage);

module.exports = productRouter;