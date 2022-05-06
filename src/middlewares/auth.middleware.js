const authCheck = async (req, res, next) => {
    try {
        if (req.cookies.access_token) {
            return next();
        }
        else {
            res.json('u must authorized');
        }
    } catch (err) {
        next(err);
    }
}
module.exports = {
    authCheck
}