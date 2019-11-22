const request = require('supertest');

const server = require('../api/server');

const db = require('../data/db-config');
const ticketDb = require('./tickets-model');

// /api/tickets/...
describe('tickets router', () => {
    // helper or user can get all open tickets
    describe('GET /open', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/open');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        test('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/open').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i)
            expect(res.body.length).toBeTruthy();
        })
        
        
        
    })

    // helper or user can get all resolved tickets
    describe('GET /resolved', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/resolved');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/resolved').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
        })
    })

    // student can get his/her open tickets
    describe('students/student/open', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/students/student/open');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/students/student/open').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
        })
    })

    // get all information for ticket by id
    describe('GET /id', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/id');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an object if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/1').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body).toBeTruthy();
        })
    })


    // student can get his/her resolved tickets
    describe('GET /students/student/resolved', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/students/student/resolved');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/students/student/resolved').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
        })
    })

    // get all open tickets that a helper is assigned to
    describe('GET /helpers/open', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/helpers/open');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array if authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/helpers/open').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body).toEqual({message: 'No open tickets found for helper with id 1'});
        })
    })

    // get all resolved tickets a helper was assigned to
    describe('GET /helpers/resolved', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/tickets/helpers/resolved');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200 and an array authenticated', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'michael',
                password: 'pass'
            });

            const res = await request(server).get('/api/tickets/helpers/resolved').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
            
        })
    })

    // a student can open a ticket
    describe('POST /', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // as a helper assign yourself to a ticket
    describe('POST /id/help', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/help');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // helper can unassign themselves and send ticket back to queue
    describe('DELETE /id/queue', () => {
        it('should require authorization', async () => {
            const res = await request(server).delete('/api/tickets/1/queue');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // student can update a ticket if they are the author
    describe('PUT /id', () => {
        it('should require authorization', async () => {
            const res = await request(server).put('/api/tickets/1');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // student can delete a ticket if they are the author
    describe('DELETE /id', () => {
        it('should require authorization', async () => {
            const res = await request(server).delete('/api/tickets/1');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // mark ticket as resolved with solution, must be author or helper assigned to ticket
    describe('POST /id/resolve', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/resolve');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // update ticket solution, must be author or helper assigned to ticket
    describe('PUT /resolved/id', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/resolved/1');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // add pictures to open ticket
    describe('POST /id/pictures/open', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/pictures/open');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // add pictures to resolved ticket
    describe('POST /id/pictures/resolved', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/pictures/resolved');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // add video to open ticke
    describe('POST /id/video/open', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/video/open');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })

    // add video to resolved ticket
    describe('POST /id/video/resolved', () => {
        it('should require authorization', async () => {
            const res = await request(server).post('/api/tickets/1/video/resolved');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });
    })
});