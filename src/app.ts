import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import Joi from "joi"
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan('dev'));

dotenv.config({ path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

app.all('*', (req, res) => res.status(404).json({ message: "Undefinded Routes" }));

export default app;