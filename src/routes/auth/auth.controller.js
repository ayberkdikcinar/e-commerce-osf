const userModel = require('../../models/user.model')

function renderSingInPage(req, res) {
    res.render('signin');
}

function renderSignUpPage(req, res) {
    res.render('signup')
}

async function postSignIn(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    const response = await userModel.signIn(user);
    console.log(response.data.token);
}

async function postSignUp(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    const response = await userModel.signUp(user);
    if (response.error) {
        res.render('signup', { error: response.error })
    }
    else {
        console.log(response.data.token);
    }

}


module.exports = {
    renderSignUpPage,
    renderSingInPage,
    postSignIn,
    postSignUp,
}