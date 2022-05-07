const { axiosGet, axiosPost } = require('../services/network.service')

const URL = '/cart'
async function getCart(token) {
    const response = await axiosGet(URL, token);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}

async function addItem(item, token) {
    const response = await axiosPost(`${URL}/addItem`, item, token);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}

async function removeItem(item, token) {
    const response = await axiosPost(`${URL}/removeItem`, item, token);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}

async function changeQuantityOfItem(data, token) {
    const response = await axiosPost(`${URL}/changeItemQuantity`, data, token);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}

module.exports = {
    getCart,
    addItem,
    removeItem,
    changeQuantityOfItem,
}