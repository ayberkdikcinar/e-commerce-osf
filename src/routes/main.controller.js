const categoryModel = require('../models/category.model')

async function renderIndexWithInitialCategoryData(req, res) {
    const response = await categoryModel.getCategoryByParentId('root');
    let authCheck = false;
    if (req.cookies.access_token) {
        authCheck = true;
    }
    res.render('index.ejs', { data: response.data, authCheck: authCheck })
}

module.exports = {
    renderIndexWithInitialCategoryData,
}