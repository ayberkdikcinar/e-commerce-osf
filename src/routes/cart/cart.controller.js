const cartModel = require('../../models/cart.model')
const productModel = require('../../models/product.model')
const createError = require('http-errors');
const Sentry = require('@sentry/node');
require('dotenv').config();

async function renderCartPage(req, res, next) {
    try {
        let totalAmount = 0;

        const responseCart = await cartModel.getCart(req.cookies.access_token);

        if (!responseCart.status || !responseCart.status.toString().startsWith('20')) {
            throw new createError(responseCart.status, responseCart.data.error);
        }
        const items = responseCart.data.items;

        for (let i = 0; i < items.length; i++) {
            const product = await productModel.getProductById(items[i].productId);

            if (!product.status || !product.status.toString().startsWith('20')) {
                throw new createError(product.status, product.data.error);
            }
            productModel.addImageLinkExplicitly(product.data[0], 'large');

            Object.assign(items[i], {
                product_title: product.data[0].page_title,
                product_description: product.data[0].page_description,
                product_image: product.data[0].image,
            });
            totalAmount += items[i]['variant'].price;
        }

        res.status(200).render('cart', { items: items, totalAmount: totalAmount, stripeId: process.env.STRIPE_PUBLIC_KEY })

    } catch (error) {
        if (error.status == 400) {
            if (error.message == 'There is no cart created for this user') {
                res.status(400).render('cart', { error: "Your cart is empty. Please add some items to your cart.", stripeId: 0 });
            } else {
                res.status(400).render('cart', { error: error.data.error, stripeId: 0 });
            }

        } else {
            Sentry.captureException(error);
            next(error);
        }

    }
}

async function addItem(req, res) {
    try {
        const item = req.body;
        const response = await cartModel.addItem(item, req.cookies.access_token);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.status(201).json(response.data);

    } catch (error) {
        Sentry.captureException(error);
        res.status(400).json(error.message);
    }

}

async function changeQuantityOfItem(req, res) {
    try {
        const data = req.body;
        const response = await cartModel.changeQuantityOfItem(data, req.cookies.access_token);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.status(200).json(response.data);

    } catch (error) {
        Sentry.captureException(error);
        res.status(400).json(error.message);
    }
}

async function removeItem(req, res) {
    try {
        const item = {
            productId: req.body.productId,
            variantId: req.body.variantId,
        }
        const response = await cartModel.removeItem(item, req.cookies.access_token);

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.redirect('/cart');

    } catch (error) {
        Sentry.captureException(error);
        res.status(400).json(error.message);
    }
}

module.exports = {
    renderCartPage,
    addItem,
    changeQuantityOfItem,
    removeItem,
}
