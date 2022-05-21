const userModel = require('../../models/user.model')
const createError = require('http-errors');
const Sentry = require('@sentry/node');

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
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.cookie('access_token', response.data.token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.cookie('user_data', {
            name: response.data.user.name,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
        }, { httpOnly: true, secure: true, maxAge: 3600000 });

        res.redirect('/');

    } catch (error) {
        Sentry.captureException(error);
        res.render('signin', { error: error.message })
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

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }

        res.cookie('access_token', response.data.token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.cookie('user_data', {
            name: response.data.user.name,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
        }, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.redirect('/');

    } catch (error) {
        Sentry.captureException(error);
        res.render('signup', { error: error.message })
    }
}

async function signOut(req, res, next) {
    try {
        res.clearCookie('access_token');
        res.clearCookie('user_data');
        res.redirect('/auth/signin');

    } catch (error) {
        Sentry.captureException(error);
        next(error);
    }


};


module.exports = {
    renderSignUpPage,
    renderSingInPage,
    postSignIn,
    postSignUp,
    signOut,
}