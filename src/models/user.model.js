const { axiosPost } = require('../services/network.service')

const URL = '/auth';

async function signIn(user) {
    return await axiosPost(`${URL}/signin`, user);
}

async function signUp(user) {
    return await axiosPost(`${URL}/signup`, user);
}


module.exports = {
    signIn,
    signUp,
}