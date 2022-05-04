const categoryModel = require('../models/category.model')
const helper = require('../services/helper')

async function getCategoryById(req, res) {
    const response = await categoryModel.getCategoryById(req.params.id);
    res.render('categories.ejs', { data: response.data })

}

async function getCategoryDataWithParent(req, res) {
    const categories = await categoryModel.getCategoryByParentId(req.params.id);
    const parent = await categoryModel.getCategoryById(req.params.id);
    const isParent = helper.checkUrlForIncludeString(req.url, 'parent');

    res.render('categories.ejs', { categories: categories.data, parent: parent.data, isParent: isParent });

}

async function getAllCategories(req, res) {
    const response = await categoryModel.getAllCategories();
    console.log(response.data)
}

module.exports = {
    getCategoryById,
    getCategoryDataWithParent,
    getAllCategories,

}