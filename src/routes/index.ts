import { Router } from 'express';
import auth from './auth.routes';
import users from './user.routes';
import equipment from './equipment.routes';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/equipments', equipment);

export default router;
