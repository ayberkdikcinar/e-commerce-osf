const request = require('supertest');
const app = require('../../app')
const userModel = require('../../models/user.model')
describe('WISHLIST TESTS', () => {

    test('addItem without token should respond with invalid token', async () => {

        const item = {
            "productId": "86736845",
            "variantId": "883360544250",
            "quantity": 1
        };
        const response = await request(app).post('/wishlist/addItem').send(item);
        expect(response.status).toBe(401);

    });
    describe('Wishlist With Token', () => {

        let token = '';
        const item = {
            "productId": "86736845",
            "variantId": "883360544250",
            "quantity": 1
        };
        const itemExist = {
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity": 1
        };

        beforeAll(async () => {
            const response = await userModel.signIn({
                email: 'test@test.com',
                password: '123456'
            });
            token = response.data.token;
        })

        describe('POST /AddItem item that is not exist', () => {

            test('addItem should response with 201 created', async () => {
                const response = await request(app).post('/wishlist/addItem').set('Cookie', [`access_token=${token}`]).send(item)
                expect(response.status).toBe(201);
                await request(app).post('/wishlist/removeItem').set('Cookie', [`access_token=${token}`]).send(item);
            });
        });

        describe('POST /AddItem item that is already exist', () => {

            test('addItem should response with 400 item is exist', async () => {
                const response = await request(app).post('/wishlist/addItem').set('Cookie', [`access_token=${token}`]).send(itemExist)
                expect(response.error.text).toMatch("This Item is already in your wishlist")
            });
        });

        describe('DELETE /removeItem item that is not exist', () => {

            test('removeItem should response with 400 item does not exist', async () => {

                const response = await request(app).post('/wishlist/removeItem').set('Cookie', [`access_token=${token}`]).send({
                    "productId": "25695191",
                    "variantId": "013742002607",
                    "quantity": 1
                })
                expect(response.status).toBe(400);
                expect(response.error.text).toMatch("This item is not in your wishlist");
            });
        });

        describe('GET /cart', () => {

            test('/cart should response with 200 if any item exist in wishlist', async () => {

                const response = await request(app).get('/wishlist').set('Cookie', [`access_token=${token}`])
                expect(response.status).toBe(200);
            });

            test('/cart should response with 400 if wishlist is empty', async () => {
                const userWithEmptyWishlist = await userModel.signIn({
                    email: 'test1@test1.com',
                    password: '123456'
                });

                const tokenForEmptyWishListUser = userWithEmptyWishlist.data.token;

                const response = await request(app).get('/wishlist').set('Cookie', [`access_token=${tokenForEmptyWishListUser}`]);

                expect(response.status).toBe(400);

            });

        });

    });

})
