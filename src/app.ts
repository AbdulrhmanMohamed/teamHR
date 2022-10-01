import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import Joi from "joi";
import bodyParser from "body-parser"
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
    .use('/api/v1/users', user)
    .use('/api/v1/packages',packages)
    .use('/api/v1/subscription',subscription)
    .use('/api/v1/company',company)

    .all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));

export default app;