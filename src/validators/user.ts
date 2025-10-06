import { body, param } from 'express-validator';

export const userIdParam = [param('id').isMongoId().withMessage('ID inválido')];

export const updateUserValidator = [
  body('name').optional().isString().isLength({ min: 2 }),
  body('role').optional().isIn(['admin', 'user']),
  body('isActive').optional().isBoolean(),
];
