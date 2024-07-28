import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import corsOptions from './config/corsOprions';
import limiter from './config/limiter';
import routes from './routes';
import { swaggerUi, specs } from './swagger';
import { routeNotFound, errorHandler } from './middleware/error';

const app: Express = express();

app.use(limiter);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/', routes);

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware for handling 404 - Not Found
app.use(routeNotFound);

// Middleware for handling errors
app.use(errorHandler);

export default app;
