import 'dotenv/config';
import express, { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors'; // This module monkey patches express to allow async error handling
import cors from 'cors';
import './tasks'; // Import the tasks to run the cron jobs
import { HttpError } from 'http-errors';
import { AuthRouter } from './modules/auth';
import { UserRouter } from './modules/users';
import { ArraysRouter } from './modules/arrays';
import * as process from 'process';


const app = express();
const port = 8080;

let corsOptions = {
    origin : ['http://localhost:5173'],
 }
 
 

app.use(express.json() as any);
app.use(cors({credentials: true, origin: 'http://localhost:5173'})); // You may want to restrict this to only the domains you trust in a production app

const api = Router();

api.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

api.use('/auth', AuthRouter);
api.use('/users', UserRouter);
api.use('/arrays', ArraysRouter);

app.use('/api', api);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof HttpError)) return void next(err);

    res.statusCode = err.statusCode;
    res.json({ message: err.message });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
