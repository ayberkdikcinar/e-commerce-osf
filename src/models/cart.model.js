const { axiosGet, axiosPost, axiosDelete } = require('../services/network.service')

const URL = '/cart'

async function getCart(token) {
    return await axiosGet(URL, token);
}

async function addItem(item, token) {
    return await axiosPost(`${URL}/addItem`, item, token);
}

async function removeItem(item, token) {
    return await axiosDelete(`${URL}/removeItem`, item, token);
}

async function changeQuantityOfItem(data, token) {
    return await axiosPost(`${URL}/changeItemQuantity`, data, token);
}

module.exports = {
    getCart,
    addItem,
    removeItem,
    changeQuantityOfItem,
}