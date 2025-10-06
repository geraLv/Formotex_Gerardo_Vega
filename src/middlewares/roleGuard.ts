import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiResponse';
import type { Role } from '../constants/roles';

export function requireRoles(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, 'No autenticado');
    if (!roles.includes(req.user.role)) throw new ApiError(403, 'No autorizado');
    next();
  };
}
