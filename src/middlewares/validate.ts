import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiResponse';

export function validate(req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mapped = errors.array({ onlyFirstError: true }).map((e) => ({ field: e.param, message: e.msg }));
    throw new ApiError(400, JSON.stringify(mapped));
  }
  next();
}
