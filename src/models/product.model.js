const { axiosGet } = require('../services/network.service')

const URL = '/products/product_search';

async function getProductById(id) {
    return await axiosGet(`${URL}?id=${id}`)

}

async function getProductByCategoryId(id, page) {
    return await axiosGet(`${URL}?primary_category_id=${id}&page=${page}`)

}

//assign image path directly to product for better usage in the view.
function addImageLinkExplicitly(product, color, type) {
    if (product) {
        for (let i = 0; i < product['image_groups'].length; i++) {
            if (product['image_groups'][i]['view_type'] == 'large') {
                if (!color) {
                    Object.assign(product, {
                        image: product['image_groups'][i]['images'][0].link,
                    });
                    break;
                } else {
                    for (const image of product['image_groups'][i]['images']) {
                        if (image.link.toString().includes(color)) {
                            Object.assign(product, {
                                image: image.link,
                            });
                        }
                    }
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