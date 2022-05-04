const { axiosGet, axiosPost, addSecretToData } = require('../services/network.service')

const URL = '/auth';

async function signIn(user) {

    user = addSecretToData(user);
    return await axiosPost(`${URL}/signin`, user);
}

async function signUp(user) {

    user = addSecretToData(user);
    return await axiosPost(`${URL}/signup`, user);
}


module.exports = {
    signIn,
    signUp,
}