const errorHandling = ((err, req, res, next) => {

    if ((err.status) == 400) {
        return res.status(400).render('error', { error: err.data.error });
    }
    else if ((err.status) == 404) {
        return res.status(404).render('error', { error: 'NOT FOUND' });
    }
    else {
        console.log(err);
        return res.status(500).render('error', { error: "Something Went Wrong!" });
    }

});

const notFoundPage = ((req, res) => {
    return res.status(404).render('error', { error: 'PAGE NOT FOUND' });
});

module.exports.errorHandling = errorHandling;
module.exports.notFoundPage = notFoundPage; 