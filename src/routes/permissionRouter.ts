import { Router } from 'express';
import permissionCardValidation from '../middleware/permissionCardValidation';
import { blockCard } from '../constrollers/permissionController';

const router = Router();

router.patch('/block-card', permissionCardValidation, blockCard);

export default router;