const cartModel = require('../../models/cart.model')

async function renderCartPage(req, res) {
    try {
        const response = await cartModel.getCart(req.cookies.access_token);

        res.render('cart', { items: response.data.items })

    } catch (error) {
        res.render('cart', { error: response.error })
    }
}

async function addItem(req, res) {
    const item = req.body;
    const response = await cartModel.addItem(item, req.cookies.access_token);

    if (response.data) {
        res.status(201).json(response.data);
    }
    else {
        res.status(500).json('add item failed');
    }
}

async function changeQuantityOfItem(req, res) {
    const data = req.body;
    const response = await cartModel.changeQuantityOfItem(data, req.cookies.access_token);
    res.json(JSON.stringify(response));
}

async function removeItem(req, res) {
    const data = req.body;
    const response = await cartModel.removeItem(data, req.cookies.access_token);
    res.json(JSON.stringify(response));
}

module.exports = {
    renderCartPage,
    addItem,
    changeQuantityOfItem,
    removeItem,
}
