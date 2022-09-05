import { Router } from 'express';
import permissionCardValidation from '../middleware/permissionCardValidation';
import { blockCard, unblockCard } from '../constrollers/permissionController';

const router = Router();

router.patch('/block-card', permissionCardValidation, blockCard);
router.patch('/unblock-card', permissionCardValidation, unblockCard);

export default router;