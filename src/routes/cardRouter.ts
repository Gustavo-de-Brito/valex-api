import { Router } from 'express';
import { createCard, activeCard } from '../constrollers/cardControllers';
import createCardValidation from '../middleware/createCardValidation';
import activeCardValidation from '../middleware/activeCardValidation';

const router = Router();

router.post('/create-card', createCardValidation, createCard);
router.post('/active-card', activeCardValidation, activeCard);

export default router;