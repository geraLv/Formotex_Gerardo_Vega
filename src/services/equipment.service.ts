import { Types } from 'mongoose';
import { Equipment, type EquipmentCategory } from '../models/Equipment';
import { ApiError } from '../utils/apiResponse';

type CreateEquipmentInput = {
  name: string;
  category: EquipmentCategory;
  brand?: string;
  model?: string;
  serialNumber?: string;
  quantity?: number;
  notes?: string;
};

type UpdateEquipmentInput = Partial<CreateEquipmentInput>;

type ListFilters = {
  search?: string;
  category?: EquipmentCategory;
};

export async function createEquipment(payload: CreateEquipmentInput) {
  const equipment = await Equipment.create({
    ...payload,
    quantity: payload.quantity ?? 0,
  });
  return equipment;
}

export async function listEquipment(filters: ListFilters = {}, page = 1, limit = 20) {
  const query: Record<string, unknown> = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.search) {
    const pattern = new RegExp(filters.search.trim(), 'i');
    query.$or = [
      { name: pattern },
      { brand: pattern },
      { model: pattern },
      { serialNumber: pattern },
    ];
  }

  const [items, total] = await Promise.all([
    Equipment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Equipment.countDocuments(query),
  ]);

  return {
    items,
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getEquipment(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new ApiError(400, 'ID invalido');
  const equipment = await Equipment.findById(id);
  if (!equipment) throw new ApiError(404, 'Equipo no encontrado');
  return equipment;
}

export async function updateEquipment(id: string, payload: UpdateEquipmentInput) {
  if (!Types.ObjectId.isValid(id)) throw new ApiError(400, 'ID invalido');
  const equipment = await Equipment.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  if (!equipment) throw new ApiError(404, 'Equipo no encontrado');
  return equipment;
}

export async function removeEquipment(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new ApiError(400, 'ID invalido');
  const equipment = await Equipment.findByIdAndDelete(id);
  if (!equipment) throw new ApiError(404, 'Equipo no encontrado');
}
