
function renderProfile(req, res) {
    console.log(req.session.user);
    res.render('profile.ejs', { userData: req.session.user });
}


module.exports = {
    renderProfile,
}