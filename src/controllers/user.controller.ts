import { Request, Response } from 'express';
import { asyncHandler, noContent, ok } from '../utils/apiResponse';
import * as UserService from '../services/user.service';

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserService.listUsers();
  return ok(res, users);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.user?.role !== 'admin' && req.user?.id !== id) {
    return res.status(403).json({ success: false, message: 'No autorizado' });
  }
  const user = await UserService.getUser(id);
  return ok(res, user);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.user?.role !== 'admin' && req.user?.id !== id) {
    return res.status(403).json({ success: false, message: 'No autorizado' });
  }
  const payload = req.body;
  if (req.user?.role !== 'admin') delete payload.role;
  const user = await UserService.updateUser(id, payload);
  return ok(res, user);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await UserService.removeUser(id);
  return noContent(res);
});
