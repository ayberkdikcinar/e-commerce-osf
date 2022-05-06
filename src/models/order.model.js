const { axiosGet, axiosPost } = require('../services/network.service')

const URL = '/orders';

async function getOrders(token) {
    return await axiosGet(URL, token);
}

async function createOrder(data, token) {
    return await axiosPost(URL, data, token);
}

module.exports = {
    getOrders,
    createOrder,
}