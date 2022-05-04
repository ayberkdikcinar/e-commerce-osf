const authCheck = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (token) {

            token = token.replace('Bearer ', '');

            const result = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
            if (result) {
                //req.user;
                return next();
            }

            return res.json({ 'message': 'Token is not valid.' });
        }
        else {
            throw createError(400, 'UnAuthorized.');
            //res.json({message:'Authorization must!'})
        }


    } catch (err) {
        next(err);
    }
}
module.exports = authCheck