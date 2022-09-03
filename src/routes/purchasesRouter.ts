import { Router } from 'express';
import purchaseValidation from '../middleware/purchaseValidation';
import { buy } from '../constrollers/purchaseControllers';

const router = Router();

router.post('/purchases', purchaseValidation, buy);

export default router;