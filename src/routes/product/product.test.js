const request = require('supertest');
const app = require('../../app')
const { axiosGet, axiosPost } = require('../../services/network.service')
const productModel = require('../../models/product.model')
describe('PRODUCT MODEL', () => {

    test('getProductById should respond with 200 success', async () => {
        const response = await productModel.getProductById('21736758');
        expect(response.status).toBe(200);
    });

    test('getProductById with wrong id should respond with 400 bad request', async () => {
        try {
            await productModel.getProductById('33333333333333333');
        } catch (error) {
            expect(error).toStrictEqual('Product Not Found');
        }
    });

    test('getProductById without id should respond with 400 bad request', async () => {

        try {
            await productModel.getProductById();
        } catch (error) {
            expect(error).toStrictEqual('Product Not Found');
        }
    });

    test('getProductByCategoryId respond with 200 success', async () => {
        const response = await productModel.getProductByCategoryId('womens-clothing-tops');
        expect(response.status).toBe(200);
    });

    test('getProductByCategoryId with wrong id respond with 400 bad request', async () => {

        try {
            await productModel.getProductByCategoryId('womens-clothi42ng-tops');
        } catch (error) {
            expect(error).toStrictEqual('Product Not Found');
        }

    });

    test('Product  should has image property explicitly', () => {
        const products =
            [
                {
                    "image_groups": [
                        {
                            "images": [
                                {
                                    "alt": "Open Cardigan., , large",
                                    "link": "products/large/PG.10256606.JJI15XX.PZ.jpg",
                                    "title": "Open Cardigan., "
                                },
                                {
                                    "alt": "Open Cardigan., , large",
                                    "link": "products/large/PG.10256606.JJI15XX.BZ.jpg",
                                    "title": "Open Cardigan., "
                                }
                            ],
                            "view_type": "large"
                        }],
                }
            ];

        productModel.addImageLinkExplicitly(products)
        expect(products[0]).toHaveProperty('image');
    });




})
