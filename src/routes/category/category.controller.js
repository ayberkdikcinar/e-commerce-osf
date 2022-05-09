const categoryModel = require('../../models/category.model')
const helper = require('../../services/helper')

async function getCategoryById(req, res, next) {
    try {

        const response = await categoryModel.getCategoryById(req.params.id);

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        res.render('categories.ejs', { data: response.data })

    } catch (error) {
        next(error);
    }


}

async function getCategoryDataWithParent(req, res, next) {
    try {

        const categories = await categoryModel.getCategoryByParentId(req.params.id);

        if (!categories.status || !categories.status.toString().startsWith('20')) {
            throw categories;
        }
        const parent = await categoryModel.getCategoryById(req.params.id);

        if (!parent.status || !parent.status.toString().startsWith('20')) {
            throw parent;
        }
        const isParent = helper.checkUrlForIncludeString(req.url, 'parent');

        res.status(200).render('categories.ejs', { categories: categories.data, parent: parent.data, isParent: isParent });

    } catch (error) {
        next(error);
    }

}

async function getAllCategories(req, res) {
    try {
        const response = await categoryModel.getAllCategories();
        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getCategoryById,
    getCategoryDataWithParent,
    getAllCategories,

}