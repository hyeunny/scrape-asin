import request from 'supertest';
import app from '../api/src/server';

describe('GET /products', () => {
    it('respond with json containing a list of all products', (done) => {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /asin', () => {
    const data = {
        "asin": "B002QYW8LW",
    }

    it('responds with 201 created for a valid asin', (done) => {
        request(app)
            .post('/asin')
            .send(data)
            .expect(201, done);
    }).timeout(10000);
});