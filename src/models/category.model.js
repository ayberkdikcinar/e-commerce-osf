const { axiosGet } = require('../services/network.service')

const URL = '/categories';

async function getAllCategories() {
    const response = await axiosGet(`${URL}`)
    if (response.error) {
        throw response.error;
    }
    return response;
}

async function getCategoryByParentId(id) {
    const response = await axiosGet(`${URL}/parent/${id}`)
    if (response.error) {
        throw response.error;
    }
    return response;
}

async function getCategoryById(id) {
    const response = await axiosGet(`${URL}/${id}`)
    if (response.error) {
        throw response.error;
    }
    return response;
}


module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByParentId,

}