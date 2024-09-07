// import request from 'supertest';

// import { startServer, stopServer } from '../server';
// import app from '../app';
// import config from '../config/index'; // Correctly import as an object

// describe('Express Server', () => {
//   let serverInstance: ReturnType<typeof app.listen>;

//   beforeAll(async () => {
//     jest.setTimeout(10000); // Set timeout for the hook
//     console.log('Starting server...');

//     const port = config.PORT || 3000; // Access the config object directly
//     serverInstance = await startServer(port);

//     console.log('Server started.');
//   });

//   afterAll(async () => {
//     jest.setTimeout(10000); // Set timeout for the hook
//     console.log('Stopping server...');
//     await stopServer(serverInstance); // Ensure server stops cleanly
//     console.log('Server stopped.');
//   });

//   it('should return 404 for unknown routes', async () => {
//     const response = await request(app).get('/unknown-route');
//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({
//       success: false,
//       status: 404,
//       message: 'Route not found: /unknown-route',
//     });
//   });

//   it('should return Hello, world! for the home route', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(response.text).toBe('Hello, world!');
//   });

//   // Remove the Swagger test since it's commented out in the app
//   /*
//   it('should serve Swagger docs', async () => {
//     const response = await request(app).get('/api-docs').redirects(1);
//     expect(response.status).toBe(200);
//   });
//   */
// });
