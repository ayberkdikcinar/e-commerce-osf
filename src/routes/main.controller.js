const categoryModel = require('../models/category.model')

async function renderIndexWithInitialCategoryData(req, res) {
    const response = await categoryModel.getCategoryByParentId('root');
    res.render('index.ejs', { data: response.data })
}

module.exports = {
    renderIndexWithInitialCategoryData,
}