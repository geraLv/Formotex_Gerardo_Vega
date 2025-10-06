import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginValidator, registerValidator } from '../validators/auth';
import { requireAuth } from '../middlewares/auth';
import { requireRoles } from '../middlewares/roleGuard';

const router = Router();

router.post('/login', loginValidator, validate, AuthController.login);
router.post('/register', requireAuth, requireRoles('admin'), registerValidator, validate, AuthController.register);

export default router;
