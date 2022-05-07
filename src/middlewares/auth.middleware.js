const authCheck = async (req, res, next) => {
    try {
        if (req.cookies.access_token) {
            return next();
        }
        else {

            return res.render('signin');

            //res.json('you must be authorized');
        }
    } catch (err) {
        next(err);
    }
}
module.exports = {
    authCheck
}