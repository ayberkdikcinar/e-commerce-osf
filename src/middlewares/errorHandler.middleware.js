const errorHandling = ((err, req, res, next) => {
    //console.log('Error handling inside');
    //return res.json({ 'message': err });
    console.log(err);
    if ((err.status) == 400) {
        return res.status(400).render('error', { error: err.data.error });
    }
    else {
        return res.status(400).render('error', { error: "Something Went Wrong!" });
    }

    //return res.send('404 NOT FOUND');
});

const notFoundPage = ((req, res) => {
    return res.status(404).render('error', { error: 'NOT FOUND' });
});

module.exports.errorHandling = errorHandling;
module.exports.notFoundPage = notFoundPage; 