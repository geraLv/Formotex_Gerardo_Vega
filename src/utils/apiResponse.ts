import { NextFunction, Request, Response } from 'express';

export function ok(res: Response, data: unknown, message = 'ok') {
  return res.status(200).json({ success: true, message, data });
}

export function created(res: Response, data: unknown, message = 'created') {
  return res.status(201).json({ success: true, message, data });
}

export function noContent(res: Response) {
  return res.status(204).send();
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
}
