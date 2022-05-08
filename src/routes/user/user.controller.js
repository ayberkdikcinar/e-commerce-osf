const cartModel = require('../../models/cart.model')
const wishListModel = require('../../models/wishlist.model')
async function renderProfile(req, res, next) {
    try {
        let wishListLen = 0;
        let cartLen = 0;
        const responseWish = await wishListModel.getWishlist(req.cookies.access_token);
        const responseCart = await cartModel.getCart(req.cookies.access_token);

        if (!responseWish.data.error) {
            wishListLen = responseWish.data.items.length;
        }
        if (!responseCart.data.error) {
            cartLen = responseCart.data.items.length;
        }

        res.render('profile.ejs', {
            userData: req.cookies.user_data,
            cartItemCount: cartLen,
            wishItemCount: wishListLen
        });

    } catch (error) {
        if (error.status == 400) {
            console.log(error);
            res.render('profile.ejs', { userData: req.cookies.user_data, cartItemCount: 0, wishItemCount: 0 });
        }
        else {
            next(error);
        }

    }

}


module.exports = {
    renderProfile,
}