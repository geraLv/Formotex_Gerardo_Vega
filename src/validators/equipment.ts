import { body, param, query } from 'express-validator';

const categories = ['LAPTOP', 'DESKTOP', 'MONITOR', 'ACCESSORY'];

export const equipmentIdParam = [param('id').isMongoId().withMessage('ID invalido')];

export const createEquipmentValidator = [
  body('name').isString().notEmpty().withMessage('Nombre requerido'),
  body('category').isIn(categories).withMessage('Categoria invalida'),
  body('brand').optional().isString(),
  body('model').optional().isString(),
  body('serialNumber').optional().isString(),
  body('quantity').optional().isInt({ min: 0 }),
  body('notes').optional().isString().isLength({ max: 500 }),
];

export const updateEquipmentValidator = [
  body('name').optional().isString(),
  body('category').optional().isIn(categories),
  body('brand').optional().isString(),
  body('model').optional().isString(),
  body('serialNumber').optional().isString(),
  body('quantity').optional().isInt({ min: 0 }),
  body('notes').optional().isString().isLength({ max: 500 }),
];

export const listQueryValidator = [
  query('search').optional().isString(),
  query('category').optional().isIn(categories),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 }),
];
