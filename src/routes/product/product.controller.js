const productModel = require('../../models/product.model')

async function renderProductDetailPage(req, res, next) {

    try {
        const response = await productModel.getProductById(req.query.id);
        res.render('product_detail', { product: response.data[0] });

    } catch (error) {
        next(error);
    }

}

async function renderProductPageWithProducts(req, res, next) {

    try {
        const response = await productModel.getProductByCategoryId(req.query.primary_category_id, req.query.page);
        productModel.addImageLinkExplicitly(response.data);
        res.render('products', { products: response.data })

    } catch (error) {
        next(error);
    }


}
async function getProductByCategoryId(req, res, next) {

    try {
        const response = await productModel.getProductByCategoryId(req.query.primary_category_id, req.query.page);
        productModel.addImageLinkExplicitly(response.data);
        res.json(response.data);

    } catch (error) {
        next(error);
    }



}

module.exports = {
    renderProductDetailPage,
    renderProductPageWithProducts,
    getProductByCategoryId,
}