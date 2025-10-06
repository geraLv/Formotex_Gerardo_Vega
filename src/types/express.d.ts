import type { Role } from '../constants/roles';

declare global {
  namespace Express {
    interface UserJwt {
      id: string;
      role: Role;
      email: string;
    }
    interface Request {
      user?: UserJwt;
    }
  }
}

export {};
