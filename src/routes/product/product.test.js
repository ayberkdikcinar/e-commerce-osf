const request = require('supertest');
const app = require('../../app')
const productModel = require('../../models/product.model')

describe('PRODUCT TESTS', () => {

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
        const product = {
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
        };

        productModel.addImageLinkExplicitly(product)
        expect(product).toHaveProperty('image');
    });

    test('Product  should has image property according to color explicitly', () => {
        const product = {
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
                        },
                        {
                            "alt": "Open Cardigan., , large",
                            "link": "products/large/PG.10256606.TESTTEST.BZ.jpg",
                            "title": "Open Cardigan., "
                        }
                    ],
                    "view_type": "large"
                }],
        };

        productModel.addImageLinkExplicitly(product, 'TESTTEST')
        expect(product.image).toStrictEqual('products/large/PG.10256606.TESTTEST.BZ.jpg');
    });

    //ROUTER TESTS

    it('should throw 400 bad request if id is empty string', async () => {
        await request(app).get('/product').expect(400);
    });

    it('should throw 200 success if id is true string', async () => {
        await request(app).get('/product?primary_category_id=womens-clothing-tops').expect(200);
    });

    it('should throw 200 success if page 2 is available', async () => {
        await request(app).get('/product/paginate?primary_category_id=womens-clothing-tops&page=2').expect(200);
    });

    it('should throw 400 because page 25 is not available', async () => {
        await request(app).get('/product/paginate?primary_category_id=womens-clothing-tops&page=25').expect(400);
    });

    it('should throw 400 because product id is not available', async () => {
        await request(app).get('/product/single?id=23232323').expect(400);
    });

    it('should throw 200 because product id is available', async () => {
        await request(app).get('/product/single?id=25484265').expect(200);
    });





})
