const { axiosGet } = require('../services/network.service')

const URL = '/categories';

async function getAllCategories() {
    return await axiosGet(`${URL}`)
}

async function getCategoryByParentId(id) {
    return await axiosGet(`${URL}/parent/${id}`)

}

async function getCategoryById(id) {
    return await axiosGet(`${URL}/${id}`)

}


module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByParentId,

}