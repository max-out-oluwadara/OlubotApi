import request from 'supertest';

import app from '../app';

describe('GET /health', () => {
  it('should return a health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is healthy');
  });
});
