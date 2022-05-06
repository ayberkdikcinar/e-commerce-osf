const { axiosGet, axiosPost } = require('../services/network.service')

const URL = '/auth';

async function signIn(user) {
    const response = await axiosPost(`${URL}/signin`, user);
    if (response.error) {
        throw response.error;
    }
    return response;
}

async function signUp(user) {
    const response = await axiosPost(`${URL}/signup`, user);
    if (response.error) {
        throw response.error;
    }
    return response;
}


module.exports = {
    signIn,
    signUp,
}