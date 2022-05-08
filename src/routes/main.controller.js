const categoryModel = require('../models/category.model')

async function renderIndexWithInitialCategoryData(req, res, next) {
    try {
        const response = await categoryModel.getCategoryByParentId('root');

        if (!response.status || !response.status.toString().startsWith('20')) {
            throw response;
        }
        let authCheck = false;
        if (req.cookies.access_token) {
            authCheck = true;
        }
        res.render('index.ejs', { data: response.data, authCheck: authCheck })

    } catch (error) {
        next(error);
    }

}

module.exports = {
    renderIndexWithInitialCategoryData,
}