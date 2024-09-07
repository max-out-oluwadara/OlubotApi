import request from 'supertest';

import { startServer, stopServer } from '../server';
import app from '../app';
import loadConfig from '../config/env';

describe('Express Server', () => {
  let serverInstance: ReturnType<typeof app.listen>;

  beforeAll(async () => {
    jest.setTimeout(10000); // Set timeout for the hook
    console.log('Starting server...');

    const config = await loadConfig();
    const port = config.PORT || 3000;
    serverInstance = await startServer(port);

    console.log('Server started.');
  });

  afterAll(() => {
    jest.setTimeout(10000); // Set timeout for the hook
    console.log('Stopping server...');
    stopServer(serverInstance);
    console.log('Server stopped.');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      status: 404,
      message: 'Route not found: /unknown-route',
    });
  });

  it('should serve Swagger docs', async () => {
    const response = await request(app).get('/api-docs').redirects(1);
    expect(response.status).toBe(200);
  });

  it('should return Hello, world! for the home route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });

  // Add more tests as needed
});
