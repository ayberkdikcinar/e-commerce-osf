const { axiosGet } = require('../services/network.service')

const URL = '/categories';

async function getAllCategories() {
    const response = await axiosGet(`${URL}`)
    if (!response.status.toString().startsWith('20')) {
        throw response.data.error;
    }
    return response;
}

async function getCategoryByParentId(id) {
    const response = await axiosGet(`${URL}/parent/${id}`)
    console.log(response.data);
    if (!response.status.toString().startsWith('20')) {
        throw response.data.error;
    }
    //console.log('sa');
    return response;
}

async function getCategoryById(id) {
    const response = await axiosGet(`${URL}/${id}`)
    if (!response.status.toString().startsWith('20')) {
        throw response.data.error;
    }
    return response;
}


module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByParentId,

}