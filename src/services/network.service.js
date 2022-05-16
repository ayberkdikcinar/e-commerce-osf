const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const SECRET_KEY = process.env.SECRET_KEY;

async function axiosGet(URL, token) {
    try {

        const response = await instance({
            url: URL,
            method: "get",
            params: {
                secretKey: SECRET_KEY
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;

    } catch (error) {
        //console.log(`An Error has been occurred while retrieving data from ${URL} Error: ${error.message}`);
        return handleError(error);
    }

}

async function axiosPost(URL, data, token) {
    try {
        addSecretToData(data);
        const response = await instance({
            method: 'post',
            url: URL,
            data: data,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;

    } catch (error) {
        //console.log(`An Error has been occurred while posting data to ${URL} Error: ${error}`);
        return handleError(error);
    }

}

async function axiosDelete(URL, data, token) {
    try {
        addSecretToData(data);
        const response = await instance({
            method: 'delete',
            url: URL,
            data: data,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response;

    } catch (error) {
        //console.log(`An Error has been occurred while deleting data from ${URL} Error: ${error}`);
        return handleError(error);
    }
}

function addSecretToData(data) {
    Object.assign(data, {
        secretKey: SECRET_KEY
    })
}

function handleError(error) {
    if (error.response) {
        return error.response;
    } else if (error.request) {
        return error.request;
    } else {
        return error.message;
    }
}
module.exports = {
    axiosGet,
    axiosPost,
    axiosDelete,
}


