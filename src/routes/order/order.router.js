const express = require('express');
const orderRouter = express.Router();
const orderController = require('./order.controller')

orderRouter.get('/', orderController.getOrders);
orderRouter.post('/purchase', orderController.purchase);
orderRouter.get('/create-order', orderController.createOrder);

module.exports = orderRouter;