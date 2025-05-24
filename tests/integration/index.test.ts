import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app';

describe('API integration', () => {
    it('should return a 200 status and a welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'API is up and running' });
    });
});