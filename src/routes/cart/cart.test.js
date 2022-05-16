const request = require('supertest');
const app = require('../../app')
const userModel = require('../../models/user.model')
describe('CART TESTS', () => {

    test('addItem without token should respond with invalid token', async () => {

        const item = {
            "productId": "86736845",
            "variantId": "883360544250",
            "quantity": 1
        };
        const response = await request(app).post('/cart/addItem').send(item);
        expect(response.status).toBe(401);

    });
    describe('Cart With Token', () => {

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
                const response = await request(app).post('/cart/addItem').set('Cookie', [`access_token=${token}`]).send(item)
                expect(response.status).toBe(201);
                await request(app).post('/cart/removeItem').set('Cookie', [`access_token=${token}`]).send(item);
            });
        });

        describe('POST /AddItem item that is already exist', () => {

            test('addItem should response with 400 item is exist', async () => {
                const response = await request(app).post('/cart/addItem').set('Cookie', [`access_token=${token}`]).send(itemExist)
                expect(response.error.text).toMatch("This Item is already in your cart")
            });
        });

        describe('DELETE /removeItem item that is not exist', () => {

            test('removeItem should response with 400 item does not exist', async () => {

                const response = await request(app).post('/cart/removeItem').set('Cookie', [`access_token=${token}`]).send({
                    "productId": "25695191",
                    "variantId": "013742002607",
                    "quantity": 1
                })
                expect(response.status).toBe(400);
                expect(response.error.text).toMatch("This item is not in your Cart");
            });
        });

        describe('GET /cart', () => {

            test('/cart should response with 200 if any item exist in cart', async () => {

                const response = await request(app).get('/cart').set('Cookie', [`access_token=${token}`])
                expect(response.status).toBe(200);
            });

            test('/cart should response with 400 if cart is empty', async () => {
                const userWithEmptyCart = await userModel.signIn({
                    email: 'test1@test1.com',
                    password: '123456'
                });

                const tokenForEmptyCartUser = userWithEmptyCart.data.token;

                const response = await request(app).get('/cart').set('Cookie', [`access_token=${tokenForEmptyCartUser}`]);

                expect(response.status).toBe(400);

            });

        });

    });

})
