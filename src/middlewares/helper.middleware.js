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
    next();

};
module.exports = {
    addParamsToResponse,
}