import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import Joi from "joi";
import userRouter from './routes/v1/user.router';
import packageRouter from './routes/v1/package.router';
import subscriptionsRouter from './routes/v1/subscription.router';
import authRouter from './routes/v1/auth.router';

Joi.objectId = require('joi-objectid')(Joi);

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan('dev'));

dotenv.config({ path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());


// Routes
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/packages/', packageRouter);
app.use('/api/v1/subscriptions/', subscriptionsRouter);

app.all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));

export default app;