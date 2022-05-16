const express = require('express');
const productRouter = express.Router();
const productController = require('./product.controller')
const search = require('../../services/search')

productRouter.get('/', productController.renderProductPageWithProducts);
productRouter.get('/paginate', productController.getProductByCategoryId);
productRouter.get('/single', productController.renderProductDetailPage);
productRouter.get('/search', (req, res) => {
    const products = search.searchProductByName(req.query.name);
    if (products.length == 0) {
        return res.status(404).json("product not found");
    }
    res.status(200).json({ "products": products });
})
module.exports = productRouter;