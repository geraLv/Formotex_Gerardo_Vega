import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiResponse';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (typeof err === 'object' && err !== null && (err as any).code === 11000) {
    const fields = Object.keys((err as any).keyPattern || {});
    return res.status(409).json({ success: false, message: `Duplicado en: ${fields.join(', ')}` });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  console.error(err);
  return res.status(500).json({ success: false, message: 'Error interno del servidor' });
}
