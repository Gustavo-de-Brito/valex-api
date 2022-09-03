import { Router } from 'express';
import creationRouter from './creationRouter';
import transactionRouter from './transactionsRouter';

const indexRouter = Router();

indexRouter.use(creationRouter);
indexRouter.use(transactionRouter);

export default indexRouter;