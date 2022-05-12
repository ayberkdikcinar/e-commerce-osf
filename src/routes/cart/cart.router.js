const express = require('express');
const cartRouter = express.Router();
const cartController = require('./cart.controller')

cartRouter.get('/', cartController.renderCartPage);
cartRouter.post('/addItem', cartController.addItem);
cartRouter.post('/removeItem', cartController.removeItem);
cartRouter.post('/changeItemQuantity', cartController.changeQuantityOfItem);


module.exports = cartRouter;