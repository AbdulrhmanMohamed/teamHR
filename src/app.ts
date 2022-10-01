import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from "body-parser"
import Joi from "joi";
import userRouter from './routes/v1/user.router';
import packageRouter from './routes/v1/package.router';
import subscriptionsRouter from './routes/v1/subscription.router';

Joi.objectId = require('joi-objectid')(Joi);
import user from "./routes/v1/user.router"
import packages from "./routes/v1/package.router"
import subscription from "./routes/v1/subscription.router"
import company from "./routes/v1/company.router"

const app = express();

process.env.NODE_ENV !== "production" && app.use(morgan('dev'));

dotenv.config({ path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use(cors())
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: false }))
// Routes
app.use('/api/v1/users/', userRouter)
    .use('/api/v1/packages/', packageRouter)
    .use('/api/v1/subscriptions/', subscriptionsRouter)
    .use('/api/v1/users', user)
    .use('/api/v1/company', company)

app.all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));

export default app;