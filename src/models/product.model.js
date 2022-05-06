const { axiosGet } = require('../services/network.service')

const URL = '/products/product_search';

async function getProductById(id, page) {
    const response = await axiosGet(`${URL}?id=${id}&page=${page}`)
    if (response.error) {
        throw response.error;
    }
    return response;

}

async function getProductByCategoryId(id, page) {
    const response = await axiosGet(`${URL}?primary_category_id=${id}&page=${page}`)
    if (response.error) {
        throw response.error;
    }
    return response;
}

module.exports = {
    getProductById,
    getProductByCategoryId,
}