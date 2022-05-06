const express = require('express');
const orderRouter = express.Router();
const orderController = require('./order.controller')

orderRouter.get('/', orderController.getOrders);

module.exports = orderRouter;