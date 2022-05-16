const wishListModel = require('../../models/wishlist.model')
const productModel = require('../../models/product.model')

async function renderWishPage(req, res, next) {
    try {

        const responseWish = await wishListModel.getWishlist(req.cookies.access_token);

        if (!responseWish.status || !responseWish.status.toString().startsWith('20')) {
            throw responseWish;
        }
        const items = responseWish.data.items;

        for (let i = 0; i < items.length; i++) {
            const product = await productModel.getProductById(items[i].productId);

            if (!product.status || !product.status.toString().startsWith('20')) {
                throw product;
            }

            productModel.addImageLinkExplicitly(product.data[0]);

            Object.assign(items[i], {
                product_title: product.data[0].page_title,
                product_description: product.data[0].page_description,
                product_image: product.data[0].image,
            });

        }

        res.render('wish', { items: items })

    } catch (error) {
        if (error.status == 400) {
            if (error.data.error == 'There is no wishlist created for this user') {
                res.status(400).render('wish', { error: "Your wishlist is empty. Please add some items to your wishlist." });
            } else {
                res.status(400).render('wish', { error: error.data.error });
            }

        } else {
            next(error);
        }

    }
}

async function addItem(req, res) {
    try {
        const item = req.body;
        const response = await wishListModel.addItem(item, req.cookies.access_token);

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        res.status(201).json(response.data);

    } catch (error) {
        res.status(400).json(error.data.error);
    }

}

async function changeQuantityOfItem(req, res, next) {
    const data = req.body;
    const response = await wishListModel.changeQuantityOfItem(data, req.cookies.access_token);
    //res.json(JSON.stringify(response));
}

async function removeItem(req, res) {
    try {
        const item = {
            productId: req.body.productId,
            variantId: req.body.variantId,
        }
        const response = await wishListModel.removeItem(item, req.cookies.access_token);
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        res.redirect('/wishlist');

    } catch (error) {
        res.status(400).json(error.data.error);
    }

    //res.json(JSON.stringify(response));
}

module.exports = {
    renderWishPage,
    addItem,
    changeQuantityOfItem,
    removeItem,
}
