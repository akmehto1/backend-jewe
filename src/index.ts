import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger'; // Assuming this file is named swagger.ts
import authRoutes from './routes/auth/auth.routes'; // Adjust the path as necessary
import { routes } from './routes';
import { logger } from './utlis/logger';
import './utlis/connectDB';
const app = express();
const port = 3000;
import bodyParser from 'body-parser';
import cors from 'cors';
const cookieParser = require('cookie-parser');


// Use cookie-parser middleware
app.use(cookieParser());

// Apply CORS middleware before any routes or other middleware
app.use(cors({
  origin: '*', 
  credentials: true
}));

app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, resp: Response) => {
  console.log("Home page");
  return resp.send("Home");
});

// // Setup Swagger UI
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

routes(app);

app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
