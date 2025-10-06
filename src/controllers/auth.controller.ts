import { Request, Response } from 'express';
import { asyncHandler, created, ok } from '../utils/apiResponse';
import * as AuthService from '../services/auth.service';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const data = await AuthService.login(email, password);
  return ok(res, data, 'login ok');
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await AuthService.register(req.body);
  return created(res, data, 'usuario creado');
});
