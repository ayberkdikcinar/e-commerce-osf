const cartModel = require('../../models/cart.model')
const wishListModel = require('../../models/wishlist.model')

async function renderProfile(req, res, next) {
    try {
        const { wishListLen, cartLen } = await getCartAndWishCount(req.cookies.access_token);

        res.render('profile.ejs', {
            userData: req.cookies.user_data,
            cartItemCount: cartLen,
            wishItemCount: wishListLen
        });

    } catch (error) {
        if (error.status == 400) {
            res.status(400).render('profile.ejs', { userData: req.cookies.user_data, cartItemCount: 0, wishItemCount: 0 });
        }
        else {
            next(error);
        }

    }

}

async function getCartAndWishCount(token) {
    try {
        let wishListLen = 0;
        let cartLen = 0;
        const responseWish = await wishListModel.getWishlist(token);
        const responseCart = await cartModel.getCart(token);

        if (!responseWish.data.error) {
            wishListLen = responseWish.data.items.length;
        }
        if (!responseCart.data.error) {
            cartLen = responseCart.data.items.length;
        }
        return counts = { wishListLen, cartLen };
    } catch (error) {
        next(error);
    }


}


module.exports = {
    renderProfile,
    getCartAndWishCount,
}