import { Router } from 'express';
import creationRouter from './creationRouter';
import transactionRouter from './transactionsRouter';
import purchaseRouter from './purchasesRouter';
import permissionRouter from './permissionRouter';

const indexRouter = Router();

indexRouter.use(creationRouter);
indexRouter.use(transactionRouter);
indexRouter.use(purchaseRouter);
indexRouter.use(permissionRouter);

export default indexRouter;