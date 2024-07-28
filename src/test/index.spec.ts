import request from 'supertest';

import server, { startServer, stopServer } from '../index';

describe('Express Server', () => {
  beforeAll(() => {
    jest.setTimeout(10000); // Set timeout for the hook
    console.log('Starting server...');
    startServer();
    console.log('Server started.');
  });

  afterAll(() => {
    jest.setTimeout(10000); // Set timeout for the hook
    console.log('Stopping server...');
    stopServer();
    console.log('Server stopped.');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(server).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      status: 404,
      message: 'Route not found: /unknown-route',
    });
  });

  it('should serve Swagger docs', async () => {
    const response = await request(server).get('/api-docs').redirects(1);
    expect(response.status).toBe(200);
  });

  it('should return Hello, world! for the home route', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });

  // Add more tests as needed
});
