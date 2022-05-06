const { axiosGet, axiosPost } = require('./network.service')

describe('AXIOS API', () => {

    test('axiosGet Requests should have secretKey parameter', async () => {
        const response = await axiosGet('/categories');
        expect(response.config.params).toHaveProperty('secretKey');
    });

    test('axiosPost Requests should have secretKey in body and should have jwt in header', async () => {
        const user = {
            email: "test",
            password: "test",
        }
        const response = await axiosPost('/auth/signIn', user, 'testToken');
        console.log(response);
        expect(JSON.parse(response.config.data)).toHaveProperty('secretKey');
    });

})