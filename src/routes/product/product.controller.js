const productModel = require('../../models/product.model')
const search = require('../../services/search')

async function renderProductDetailPage(req, res, next) {

    try {
        const response = await productModel.getProductById(req.query.id);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        productModel.addImageLinkExplicitly(response.data[0], 'large');
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
            productModel.addImageLinkExplicitly(response.data[i], 'large');
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
            productModel.addImageLinkExplicitly(response.data[i], 'large');
        }
        res.json(response.data);

    } catch (error) {
        next(error);
    }

}

function searchProduct(req, res) {

    const products = search.searchProductByName(req.query.keyword);

    if (products.length == 0) {
        return res.status(404).render('error', { error: "Product not found." })
    }

    res.status(200).render('search', { "products": products });
}

module.exports = {
    renderProductDetailPage,
    renderProductPageWithProducts,
    getProductByCategoryId,
    searchProduct
}