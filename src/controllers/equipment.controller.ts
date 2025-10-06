import { Request, Response } from 'express';
import { asyncHandler, created, noContent, ok } from '../utils/apiResponse';
import * as EquipmentService from '../services/equipment.service';

function asInt(value: unknown, fallback: number) {
  if (typeof value !== 'string') return fallback;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export const create = asyncHandler(async (req: Request, res: Response) => {
  const equipment = await EquipmentService.createEquipment(req.body);
  return created(res, equipment, 'equipo creado');
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { search, category, page = '1', limit = '20' } = req.query;
  const result = await EquipmentService.listEquipment(
    {
      search: typeof search === 'string' ? search : undefined,
      category: typeof category === 'string' ? (category as any) : undefined,
    },
    asInt(page, 1),
    asInt(limit, 20)
  );
  return ok(res, result);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const equipment = await EquipmentService.getEquipment(req.params.id);
  return ok(res, equipment);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const equipment = await EquipmentService.updateEquipment(req.params.id, req.body);
  return ok(res, equipment, 'equipo actualizado');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await EquipmentService.removeEquipment(req.params.id);
  return noContent(res);
});
