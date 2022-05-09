const productModel = require('../../models/product.model')

async function renderProductDetailPage(req, res, next) {

    try {
        const response = await productModel.getProductById(req.query.id);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        productModel.addImageLinkExplicitly(response.data[0]);
        res.render('product_detail', { product: response.data[0] });

    } catch (error) {
        next(error);
    }

}

async function renderProductPageWithProducts(req, res, next) {

    try {
        const response = await productModel.getProductByCategoryId(req.query.primary_category_id, req.query.page);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        for (let i = 0; i < response.data.length; i++) {
            productModel.addImageLinkExplicitly(response.data[i]);
        }
        res.render('products', { products: response.data })

    } catch (error) {
        next(error);
    }


}
async function getProductByCategoryId(req, res, next) {

    try {
        const response = await productModel.getProductByCategoryId(req.query.primary_category_id, req.query.page);

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        for (let i = 0; i < response.data.length; i++) {
            productModel.addImageLinkExplicitly(response.data[i]);
        }
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