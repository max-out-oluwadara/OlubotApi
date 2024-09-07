import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import serverAdapter from './utils/bullBoard';
import corsOptions from './config/corsOprions';
import limiter from './config/limiter';
import * as routes from './routes';
// import { swaggerUi, specs } from './swagger';
import { routeNotFound, errorHandler } from './middleware/error';

const app: Express = express();

//Essential Middleware
app.use(limiter);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/auth', routes.authRoute);
app.use('/tweet', routes.tweetRoute);
app.use('/mention', routes.mentionRoute);
app.use('/response', routes.responseRoute);
app.use('/upload', routes.fileRoute);

// Integrate Bull Board
app.use('/admin/queues', serverAdapter.getRouter());

// Setup Swagger (properly typed `specs`)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware for handling 404 - Not Found
app.use(routeNotFound);

// Middleware for handling errors
app.use(errorHandler);

export default app;
