import request from 'supertest';

import server from '../index';

describe('GET /health', () => {
  it('should return a health status', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is healthy');
  });
});
