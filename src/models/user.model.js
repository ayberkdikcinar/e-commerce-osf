const { axiosGet, axiosPost } = require('../services/network.service')

const URL = '/auth';

async function signIn(user) {
    const response = await axiosPost(`${URL}/signin`, user);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}

async function signUp(user) {
    const response = await axiosPost(`${URL}/signup`, user);
    if (!response.status.toString().startsWith('20')) {
        throw response;
    }
    return response;
}


module.exports = {
    signIn,
    signUp,
}