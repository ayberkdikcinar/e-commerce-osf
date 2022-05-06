const orderModel = require('../../models/order.model')

async function getOrders(req, res) {
    const response = await orderModel.getOrders(req.cookies.access_token);
    console.log(response);
}

async function createOrder(req, res) {
    const data = req.body;
    const response = await orderModel.createOrder(data, req.cookies.access_token);
    console.log(response);
}



module.exports = {
    getOrders,
}