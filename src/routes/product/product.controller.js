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
        addImageLinkExplicitly(response.data);
        res.render('products', { products: response.data })

    } catch (error) {
        next(error);
    }


}
async function getProductByCategoryId(req, res, next) {

    try {
        const response = await productModel.getProductByCategoryId(req.query.primary_category_id, req.query.page);
        addImageLinkExplicitly(response.data);
        res.json(response.data);

    } catch (error) {
        next(error);
    }



}

//assign image path directly to product for better usage in the view.
function addImageLinkExplicitly(products) {
    if (products) {
        for (let i = 0; i < products.length; i++) {
            for (const image of products[i]['image_groups']) {
                if (image['view_type'] == 'large') {
                    Object.assign(products[i], {
                        image: image['images'][0].link,
                    });
                    break;
                }
            }
        }
    }
}

module.exports = {
    renderProductDetailPage,
    renderProductPageWithProducts,
    getProductByCategoryId,
}