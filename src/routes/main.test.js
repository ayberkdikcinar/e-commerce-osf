const request = require('supertest');
const app = require('../app')


describe('HOME PAGE TEST', () => {
    describe('/GET /', () => {

        test('should 200 success', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });

        test('should 200 success with authCheck True', async () => {
            const response = await request(app).get('/').set('Cookie', [`access_token=232323`]);
            expect(response.status).toBe(200);
        });
    });
});