import { Router } from 'express';
import { createCard, activeCard } from '../constrollers/creationControllers';
import createCardValidation from '../middleware/createCardValidation';
import activeCardValidation from '../middleware/activeCardValidation';

const router = Router();

router.post('/create-card', createCardValidation, createCard);
router.put('/active-card', activeCardValidation, activeCard);

export default router;