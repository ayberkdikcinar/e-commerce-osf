const userModel = require('../models/user.model')

function renderSingInPage(req, res) {
    res.render('signin');
}

function renderSignUpPage(req, res) {
    res.render('signup')
}

async function postSignIn(req, res) {
    let user = req.body;
    const response = await userModel.signIn(user);

}

async function postSignUp(req, res) {
    let user = req.body;
    const response = await userModel.signUp(user);
}


module.exports = {
    renderSignUpPage,
    renderSingInPage,
    postSignIn,
    postSignUp,
}