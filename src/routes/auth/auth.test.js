const request = require('supertest');
const app = require('../../app')

describe('/auth TEST', () => {

    it('/signin should throw 302 redirect if the user information is true', async () => {
        const response = await request(app).post('/auth/signin').send({
            email:'test@test.com',
            password:'123456'
        });
        expect(response.status).toBe(302);
        expect(response.header).toHaveProperty('set-cookie');  
        
    });

    it('/signin should not include set-cookie if the user information is false', async () => {
        const response = await request(app).post('/auth/signin').send({
            email:'tetet@tetet',
            password:'etetetet'
        });
        expect(response.header).not.toHaveProperty('set-cookie');    
    });

    it('/signup should not include set-cookie if the user already exist', async () => {
        const response = await request(app).post('/auth/signup').send({
            email:'test@test.com',
            password:'123456'
        });      
        expect(response.header).not.toHaveProperty('set-cookie');    
    });

    it('/signout should redirects', async () => {

        const response = await request(app).get('/auth/signout');    
        expect(response.status).toBe(302);
    });

})
