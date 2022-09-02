import { Router } from 'express';
import { createCard } from '../constrollers/cardControllers';
import createCardValidation from '../middleware/createCardValidation';

const router = Router();

router.post('/create-card', createCardValidation, createCard);

export default router;