import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from "body-parser"
import Joi from "joi";
import userRouter from './routes/v1/user.router';
import packageRouter from './routes/v1/package.router';
import subscriptionsRouter from './routes/v1/subscription.router';
import authRouter from './routes/v1/auth.router';
import branch from './routes/v1/branch.router';
import department from './routes/v1/department.router';
import shift from './routes/v1/shift.router';
import request from './routes/v1/request.router'
import category from './routes/v1/category.router'
import subCategory from './routes/v1/subCategory.router'
import contract from './routes/v1/contract.router'
import payrol from './routes/v1/payrol.router'
import task from './routes/v1/task.router'
Joi.objectId = require('joi-objectid')(Joi);
import company from "./routes/v1/company.router"

const app = express();

process.env.NODE_ENV !== "production" && app.use(morgan('dev'));

dotenv.config({ path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use(cors())
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: false }))
// Routes
app.use('/teamHR/api/v1/auth/', authRouter)
    .use('/teamHR/api/v1/user/', userRouter)
    .use('/teamHR/api/v1/package/', packageRouter)
    .use('/teamHR/api/v1/subscription/', subscriptionsRouter)
    .use('/teamHR/api/v1/company/', company)
    .use('/teamHR/api/v1/branch/', branch)
    .use('/teamHR/api/v1/department/', department)
    .use('/teamHR/api/v1/shift/', shift)
    .use('/teamHR/api/v1/category', category)
    .use('/teamHR/api/v1/subCategory', subCategory)
    .use('/teamHR/api/v1/request', request)
    .use('/teamHR/api/v1/contract',contract)
    .use('/teamHR/api/v1/payrol',payrol)
    .use('/teamHR/api/v1/task',task)
    .all('*', (req: Request, res: Response) => res.status(404).send({ message: "Undefinded Routes" }));

export default app;