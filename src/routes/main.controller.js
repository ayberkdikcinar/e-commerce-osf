const categoryModel = require('../models/category.model')

async function renderIndexWithInitialCategoryData(req, res, next) {
    try {
        const response = await categoryModel.getCategoryByParentId('root');

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        res.render('index.ejs', { data: response.data })

    } catch (error) {
        next(error);
    }

}

module.exports = {
    renderIndexWithInitialCategoryData,
}