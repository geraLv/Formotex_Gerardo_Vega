import { Router } from 'express';
import * as EquipmentController from '../controllers/equipment.controller';
import { requireAuth } from '../middlewares/auth';
import { requireRoles } from '../middlewares/roleGuard';
import { validate } from '../middlewares/validate';
import { createEquipmentValidator, equipmentIdParam, listQueryValidator, updateEquipmentValidator } from '../validators/equipment';

const router = Router();

router.use(requireAuth);

router.get('/', listQueryValidator, validate, EquipmentController.list);
router.get('/:id', equipmentIdParam, validate, EquipmentController.get);

router.post('/', requireRoles('admin'), createEquipmentValidator, validate, EquipmentController.create);
router.patch('/:id', requireRoles('admin'), equipmentIdParam, updateEquipmentValidator, validate, EquipmentController.update);
router.delete('/:id', requireRoles('admin'), equipmentIdParam, validate, EquipmentController.remove);

export default router;
