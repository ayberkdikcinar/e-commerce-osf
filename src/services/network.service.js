const axios = require('axios');
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const SECRET_KEY = process.env.SECRET_KEY;

//{ 'Authorization': `Bearer ${req.cookies.access_token}` }
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
        console.log(`An Error has been occurred while retrieving data from ${URL} Error: ${error.message}`);
        //console.log(error.config);
        if (error.response) {
            //console.log(error.response);
            return error.response;

        } else if (error.request) {
            //console.log(error.request);
            return error.request;

        } else {
            //console.log(error.message);
            return error.message;
        }
    }

}

async function axiosPost(URL, data, token) {
    try {
        const dataWithSecret = addSecretToData(data);
        const response = await instance({
            method: 'post',
            url: URL,
            data: dataWithSecret,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response;

    } catch (error) {
        console.log(`An Error has been occurred while posting data to ${URL} Error: ${error}`);
        if (error.response) {
            //console.log(error.response);
            return error.response;

        } else if (error.request) {
            //console.log(error.request);
            return error.request;

        } else {
            //console.log(error.message);
            return error.message;
        }
    }

}

async function axiosDelete(URL, data, token) {
    try {
        const dataWithSecret = addSecretToData(data);
        const response = await instance({
            method: 'delete',
            url: URL,
            data: dataWithSecret,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response;

    } catch (error) {
        console.log(`An Error has been occurred while deleting data from ${URL} Error: ${error}`);
        console.log(error.config);
        if (error.response) {

            return error.response;

        } else if (error.request) {

            return error.request;

        } else {
            return error.message;
        }
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
}


