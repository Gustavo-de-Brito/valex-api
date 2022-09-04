import { Router } from 'express';
import rechargeCardValidation from '../middleware/rechargeCardValidation';
import {
  rechargeCard,
  getTransactions
} from '../constrollers/transactionController';

const router = Router();

router.post('/recharge-card/:id', rechargeCardValidation, rechargeCard);
router.get('/balance-transactions/:id', getTransactions);

export default router;