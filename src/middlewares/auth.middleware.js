const authCheck = async (req, res, next) => {
    try {
        if (req.cookies.access_token) {
            return next();
        }
        else {
            return res.status(401).render('signin');
        }
    } catch (err) {
        next(err);
    }
}
module.exports = {
    authCheck
}