import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth';
import { requireRoles } from '../middlewares/roleGuard';
import { updateUserValidator, userIdParam } from '../validators/user';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(requireAuth);

router.get('/', requireRoles('admin'), UserController.list);
router.get('/:id', userIdParam, validate, UserController.get);
router.patch('/:id', userIdParam, updateUserValidator, validate, UserController.update);
router.delete('/:id', requireRoles('admin'), userIdParam, validate, UserController.remove);

export default router;
