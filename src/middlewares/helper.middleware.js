const helper = require('../services/helper')


//adding params to response locals for usage in the header ejs.
const addEnabledCategoryInfo = function (req, res, next) {

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

const addSignedInfo = async function (req, res, next) {
    if (req.cookies.access_token) {
        res.locals.isSignedIn = true;
    }
    else {
        res.locals.isSignedIn = false;
    }
    return next();
}

module.exports = {
    addEnabledCategoryInfo,
    addSignedInfo,
}