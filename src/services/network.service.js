const axios = require('axios');
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.BASE_URL,
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
        console.log(error.response.status);
        console.log('axiosget içi');
        return error.response.data;
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
        console.log('axiospost içi');
        console.log(error.response.status);
        console.log(error.message);
        console.log(error.response.data);
        return error.response.data;
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
}


