const request = require('supertest');
const app = require('../../app')
const categoryModel = require('../../models/category.model')

describe('CATEGORY TESTS', () => {

    test('getAllCategories should respond with 200 success', async () => {
        const response = await categoryModel.getAllCategories();
        expect(response.status).toBe(200);
    });

    test('getCategoryByParentId with wrong id should respond with 400 bad request', async () => {
        try {
            await categoryModel.getCategoryByParentId('33333333333333333');
        } catch (error) {
            expect(error).toStrictEqual('Product Not Found');
        }
    });

    test('getCategoryByPId without id should respond with 400 bad request', async () => {

        try {
            await categoryModel.getCategoryById();
        } catch (error) {
            expect(error).toStrictEqual('Product Not Found');

        }

    });

    test('getCategoryByParentId respond with 200 success', async () => {
        const response = await categoryModel.getCategoryByParentId('mens');
        expect(response.status).toBe(200);
    });

    //ROUTER TESTS

    it('should throw 400 bad request if id is empty string', async () => {
        await request(app).get('/category/dfdfdfdf').expect(400);
    });

    it('should throw 200 success if id is true string', async () => {
        await request(app).get('/category/mens').expect(200);
    });

    it('should throw 200 success is available', async () => {
        await request(app).get('/category/parent/mens').expect(200);
    });



})
