const request = require('supertest');
const app = require('../../app')
const { axiosGet, axiosPost } = require('../../services/network.service')
const productModel = require('../../models/product.model')
describe('PRODUCT API', () => {

    describe('TEST GET /product', () => {

        test('getProductById should respond with 200 success', async () => {
            const response = await productModel.getProductById('21736758');
            expect(response.status).toBe(200);
        });

        test('getProductById with wrong id should respond with 400 bad request', async () => {
            const error = await productModel.getProductById('33333333333333333');
            expect(error.response.status).toBe(400);
            expect(error.response.data).toStrictEqual({ "error": "Product Not Found" });
        });

        test('getProductById without id should respond with 400 bad request', async () => {
            const error = await productModel.getProductById();
            expect(error.response.status).toBe(400);
            expect(error.response.data).toStrictEqual({ "error": "Product Not Found" });
        });

        test('getProductByCategoryId respond with 200 success', async () => {
            const response = await productModel.getProductByCategoryId('womens-clothing-tops');
            expect(response.status).toBe(200);
        });

        test('getProductByCategoryId with wrong id respond with 400 bad request', async () => {
            const error = await productModel.getProductByCategoryId('womens-clothi42ng-tops');
            expect(error.response.status).toBe(400);
            expect(error.response.data).toStrictEqual({ "error": "Product Not Found" });
        });

        test('axiosGet Requests should have secretKey parameter', async () => {
            const response = await axiosGet('/categories');
            expect(response.config.params).toHaveProperty('secretKey');
        });


    });
})
