import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(indexRouter);

app.listen(process.env.PORT);