const categoryModel = require('../models/category.model')
const createError = require('http-errors');
const Sentry = require('@sentry/node');

async function renderIndexWithInitialCategoryData(req, res, next) {
    try {
        const response = await categoryModel.getCategoryByParentId('root');

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.render('index.ejs', { data: response.data })

    } catch (error) {
        Sentry.captureException(error);
        next(error);
    }

}

module.exports = {
    renderIndexWithInitialCategoryData,
}