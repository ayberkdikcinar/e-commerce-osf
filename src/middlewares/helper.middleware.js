const helper = require('../services/helper')

const addParamsToResponse = function (req, res, next) {

    if (helper.checkUrlForIncludeString(req.url, 'womens')) {
        res.locals.isWomenCategoryEnabled = true;
    } else {
        if (helper.checkUrlForIncludeString(req.url, 'men')) {
            res.locals.isWomenCategoryEnabled = false;
        }
        else {
            res.locals.isWomenCategoryEnabled = null;
        }
    }
    return next();

};

const addSignedInfo = function (req, res, next) {
    if (req.cookies.access_token) {
        res.locals.isSignedIn = true;
    }
    else {
        res.locals.isSignedIn = false;
    }
    return next();
}

module.exports = {
    addParamsToResponse,
    addSignedInfo,
}