const { axiosGet } = require('../services/network.service')

const URL = '/categories';

async function getAllCategories() {

}

async function getCategoryByParentId(id) {
    const response = await axiosGet(`${URL}/parent/${id}`)
    return response;
}

async function getCategoryById(id) {
    const response = await axiosGet(`${URL}/${id}`)
    return response;
}


module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByParentId,

}