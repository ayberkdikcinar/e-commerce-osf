const express = require('express');
const wishListRouter = express.Router();
const wishListController = require('./wishList.controller')

wishListRouter.get('/', wishListController.renderWishPage);
wishListRouter.post('/addItem', wishListController.addItem);
wishListRouter.post('/removeItem', wishListController.removeItem);
wishListRouter.post('changeItemQuantity', wishListController.changeQuantityOfItem);


module.exports = wishListRouter;