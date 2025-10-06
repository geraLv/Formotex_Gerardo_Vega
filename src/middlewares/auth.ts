import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/User';
import { ApiError } from '../utils/apiResponse';

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) throw new ApiError(401, 'Token no provisto');
  const token = header.split(' ')[1];
  const payload = verifyToken(token);

  const user = await User.findById(payload.id);
  if (!user || !user.isActive) throw new ApiError(401, 'Usuario inválido o inactivo');

  req.user = { id: user.id, role: user.role, email: user.email };
  next();
}
