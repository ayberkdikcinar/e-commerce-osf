const { axiosGet } = require('../services/network.service')

const URL = '/products/product_search';

async function getProductById(id, page) {
    const response = await axiosGet(`${URL}?id=${id}&page=${page}`)
    return response;
    // `/products/product_search?id=${id}`
}

async function getProductByCategoryId(id, page) {
    const response = await axiosGet(`${URL}?primary_category_id=${id}&page=${page}`)
    return response;
    // `/products/product_search?primary_category_id=${id}`
}

module.exports = {
    getProductById,
    getProductByCategoryId,
}