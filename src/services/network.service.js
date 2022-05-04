const axios = require('axios');
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.BASE_URL,
});

const SECRET_KEY = process.env.SECRET_KEY;


async function axiosGet(URL, headers) {
    try {
        const response = await instance({
            url: URL,
            method: "get",
            params: {
                secretKey: SECRET_KEY
            },
            headers: headers
        });
        return response;

    } catch (error) {
        console.log(`An Error has been occurred while retrieving data from ${URL} Error: ${error}`);
        return error;
    }

}

async function axiosPost(URL, data, headers) {
    try {
        const response = await instance({
            method: 'post',
            url: URL,
            data: data,
            headers: headers
        });

        return response;

    } catch (error) {
        console.log(`An Error has been occurred while posting data to ${URL} Error: ${error}`);
        return error;
    }

}

async function axiosDelete(URL, headers) {
    try {
        const response = await instance({
            method: 'delete',
            url: URL,
            headers: headers
        });

        return response;

    } catch (error) {
        console.log(`An Error has been occurred while deleting data from ${URL} Error: ${error}`);
        return error;
    }
}

function addSecretToData(data) {

    Object.assign(data, {
        secretKey: SECRET_KEY
    })
    return data;
}

module.exports = {
    axiosGet,
    axiosPost,
    axiosDelete,
    addSecretToData,

}


