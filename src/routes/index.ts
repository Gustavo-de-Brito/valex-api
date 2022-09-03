import { Router } from 'express';
import creationRouter from './creationRouter';
import transactionRouter from './transactionsRouter';
import purchaseRouter from './purchasesRouter';

const indexRouter = Router();

indexRouter.use(creationRouter);
indexRouter.use(transactionRouter);
indexRouter.use(purchaseRouter);

export default indexRouter;