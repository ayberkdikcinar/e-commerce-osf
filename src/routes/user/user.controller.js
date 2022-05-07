const cartModel = require('../../models/cart.model')

async function renderProfile(req, res, next) {
    try {
        const response = await cartModel.getCart(req.cookies.access_token);
        res.render('profile.ejs', { userData: req.session.user, cartItemCount: response.data.items.length });

    } catch (error) {
        if (error.status == 400) {
            res.render('profile.ejs', { userData: req.session.user, cartItemCount: 0 });
        }
        else {
            next(error);
        }

    }

}


module.exports = {
    renderProfile,
}