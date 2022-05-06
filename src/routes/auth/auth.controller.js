const userModel = require('../../models/user.model')

function renderSingInPage(req, res) {
    res.render('signin');
}

function renderSignUpPage(req, res) {
    res.render('signup')
}

async function postSignIn(req, res) {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        }
        const response = await userModel.signIn(user);

        res.cookie('access_token', response.data.token, { httpOnly: true, secure: true, maxAge: 3600000 });
        req.session.user = {
            name: response.data.user.name,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
        }
        res.redirect('/');

    } catch (error) {
        res.render('signin', { error: error })
    }


}

async function postSignUp(req, res) {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        const response = await userModel.signUp(user);

        res.cookie('access_token', response.data.token, { httpOnly: true, secure: true, maxAge: 3600000 });
        req.session.user = {
            name: response.data.user.name,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
        }
        res.redirect('/');

    } catch (error) {
        res.render('signup', { error: error })
    }


}


module.exports = {
    renderSignUpPage,
    renderSingInPage,
    postSignIn,
    postSignUp,
}