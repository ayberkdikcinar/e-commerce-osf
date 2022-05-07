const { axiosGet } = require('../services/network.service')

const URL = '/products/product_search';

async function getProductById(id, page) {
    const response = await axiosGet(`${URL}?id=${id}&page=${page}`)
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;

}

async function getProductByCategoryId(id, page) {
    const response = await axiosGet(`${URL}?primary_category_id=${id}&page=${page}`)
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
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
    getProductById,
    getProductByCategoryId,
    addImageLinkExplicitly,
}