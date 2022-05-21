const categoryModel = require('../../models/category.model')
const helper = require('../../services/helper')
const createError = require('http-errors');
const Sentry = require('@sentry/node');
async function getCategoryById(req, res, next) {
    try {

        const response = await categoryModel.getCategoryById(req.params.id);

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
        res.render('categories.ejs', { data: response.data })

    } catch (error) {
        Sentry.captureException(error);
        next(error);
    }


}

async function getCategoryDataWithParent(req, res, next) {
    try {

        const categories = await categoryModel.getCategoryByParentId(req.params.id);

        if (!categories.status || !categories.status.toString().startsWith('20')) {
            throw new createError(categories.status, categories.data.error);
        }
        const parent = await categoryModel.getCategoryById(req.params.id);

        if (!parent.status || !parent.status.toString().startsWith('20')) {
            throw new createError(parent.status, parent.data.error);
        }
        const isParent = helper.checkUrlForIncludeString(req.url, 'parent');

        res.status(200).render('categories.ejs', { categories: categories.data, parent: parent.data, isParent: isParent });

    } catch (error) {
        Sentry.captureException(error);
        next(error);
    }

}

async function getAllCategories(req, res, next) {
    try {
        const response = await categoryModel.getAllCategories();
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw new createError(response.status, response.data.error);
        }
    } catch (error) {
        Sentry.captureException(error);
        next(error);
    }

}

module.exports = {
    getCategoryById,
    getCategoryDataWithParent,
    getAllCategories,

}