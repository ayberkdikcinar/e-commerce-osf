const orderModel = require('../../models/order.model')
require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)


async function getOrders(req, res, next) {
    try {
        await orderModel.getOrders(req.cookies.access_token);
        res.render('success_payment');
    } catch (error) {
        next(error);
    }

}

async function purchase(req, res, next) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.itemList.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            metadata: {
                                product_id: item.product_id,
                                productId: item.productId,
                            },
                            name: item.title,
                        },
                        unit_amount: Number(item.price * 100),
                    },
                    quantity: item.quantity,

                }
            }),
            success_url: `${process.env.PRODUCTION_URL}order/create-order?session_id={CHECKOUT_SESSION_ID}`, //http://localhost:8000/
            cancel_url: `${process.env.PRODUCTION_URL}cart/`//http://localhost:8000/',
        })
        res.json({ id: session.id })
    } catch (e) {
        next(e);
    }
}

async function createOrder(req, res, next) {

    try {

        let items = [];
        let requestData = {};
        const session = await stripe.checkout.sessions.listLineItems(req.query.session_id);

        for (let i = 0; i < session.data.length; i++) {

            const product = await stripe.products.retrieve(session.data[i].price.product);
            const item = {
                variant: {
                    variation_values: {
                        color: "C43",
                        size: "33"
                    },
                    price: 145,
                    product_id: product.metadata.product_id,
                    orderable: true
                },
                productId: product.metadata.productId,
                quantity: 1
            }
            items.push(item);
        }

        Object.assign(requestData, {
            items: items,
            paymentId: req.query.session_id,
            address: "address"
        });

        await orderModel.createOrder(requestData, req.cookies.access_token);
        res.redirect('/order');

    } catch (error) {
        next(error);
    }


}

module.exports = {
    getOrders,
    purchase,
    createOrder
}