import { Router } from 'express';
import rechargeCardValidation from '../middleware/rechargeCardValidation';
import { rechargeCard } from '../constrollers/transactionController';

const router = Router();

router.post('/recharge-card/:id', rechargeCardValidation, rechargeCard);

export default router;