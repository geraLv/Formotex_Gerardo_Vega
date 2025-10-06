import jwt from 'jsonwebtoken';
import type { Role } from '../constants/roles';

const { JWT_SECRET = 'change_me', JWT_EXPIRES_IN = '1d' } = process.env;

export interface JwtPayload {
  id: string;
  role: Role;
  email: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
}
