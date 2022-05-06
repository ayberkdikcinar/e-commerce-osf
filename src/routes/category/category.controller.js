const categoryModel = require('../../models/category.model')
const helper = require('../../services/helper')

async function getCategoryById(req, res, next) {

    try {
        const response = await categoryModel.getCategoryById(req.params.id);
        res.render('categories.ejs', { data: response.data })

    } catch (error) {
        next(error);
    }


}

async function getCategoryDataWithParent(req, res, next) {

    try {
        const categories = await categoryModel.getCategoryByParentId(req.params.id);
        const parent = await categoryModel.getCategoryById(req.params.id);
        const isParent = helper.checkUrlForIncludeString(req.url, 'parent');

        res.status(200).render('categories.ejs', { categories: categories.data, parent: parent.data, isParent: isParent });

    } catch (error) {
        next(error);
    }

}

async function getAllCategories(req, res) {
    return await categoryModel.getAllCategories();
}

module.exports = {
    getCategoryById,
    getCategoryDataWithParent,
    getAllCategories,

}