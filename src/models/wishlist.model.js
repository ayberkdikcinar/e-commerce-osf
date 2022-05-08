const { axiosGet, axiosPost, axiosDelete } = require('../services/network.service')

const URL = '/wishlist'

async function getWishlist(token) {
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
    getWishlist,
    addItem,
    removeItem,
    changeQuantityOfItem,
}