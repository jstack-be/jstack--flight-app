import request from 'supertest';
import {app} from '../src/server';

describe('POST /api/flights', () => {
    it('should return 400 if no messages are provided', async () => {
        const res = await request(app)
            .post('/api/flights')
            .send({messages: []});

        expect(res.status).toBe(400);
        expect(res.text).toBe("No message provided");
    });

    it('should return 400 if no departure place is provided', async () => {
        const res = await request(app)
            .post('/api/flights')
            .send({messages: ['I want to travel to London on 19/05/2024']});

        expect(res.status).toBe(400);
    });

    it('should return 400 if no departure date is provided', async () => {
        const res = await request(app)
            .post('/api/flights')
            .send({messages: ['I want to travel to London from Brussel']});

        expect(res.status).toBe(400);
    });

    it('should return 200 and flight data if messages are valid', async () => {
        const res = await request(app)
            .post('/api/flights')
            .send({messages: ['I want to travel to London from Hamburg on 19/05/2024']}); // Assuming these messages are valid

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // Check if the response body is an array
        expect(res.body.length).toBeGreaterThan(0); // Check if the array contains at least one flight
        expect(res.body[0]).toHaveProperty('id'); // Check if the first flight has an 'id' property

    });
});