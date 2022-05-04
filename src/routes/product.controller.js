const productModel = require('../models/product.model')

async function getProductById(req, res) {
    const response = await productModel.getProductById(req.query.id);
    //console.log(response.data)
    res.render('product_detail', { product: response.data[0] })
}

async function getProductByCategoryId(req, res) {
    const response = await productModel.getProductByCategoryId(req.query.primary_category_id);
    //const products = response.data;

    res.render('products', { products: response.data })
    //console.log(response.data);
}

module.exports = {
    getProductById,
    getProductByCategoryId,

}