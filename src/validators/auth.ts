import { body } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password inválido'),
];

export const registerValidator = [
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'user']).withMessage('Rol inválido')
];
