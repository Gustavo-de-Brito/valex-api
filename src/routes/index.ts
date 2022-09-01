import { Router } from 'express';
import cardRouter from './cardRouter';

const indexRouter = Router();

indexRouter.use(cardRouter);

export default indexRouter;