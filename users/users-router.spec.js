const request = require('supertest');

const server = require('../api/server');

const db = require('../data/db-config');
const userDb = require('./users-model');

    
// /api/users/...
describe('users router', () => {
    // user can update account
    describe('POST /users/user', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/users/user');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'mark',
                password: 'pass'
            });

            const res = await request(server).get('/api/users/user').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
        })
    })

    // user can get user information
    describe('GET /users/user', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/users/user');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'mark',
                password: 'pass'
            });

            const res = await request(server).get('/api/users/user').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
    })

    // user can delete account
    describe('DELETE /users/user', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/users/user');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and account should be deleted', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'mark',
                password: 'pass'
            });

            const res = await request(server).delete('/api/users/user').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
            
        })
    })
});