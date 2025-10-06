import { Schema, model, type Document } from 'mongoose';

export type EquipmentCategory = 'LAPTOP' | 'DESKTOP' | 'MONITOR' | 'ACCESSORY';

export interface IEquipment extends Document {
  name: string;
  category: EquipmentCategory;
  brand?: string;
  model?: string;
  serialNumber?: string;
  quantity: number;
  notes?: string;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['LAPTOP', 'DESKTOP', 'MONITOR', 'ACCESSORY'] },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    serialNumber: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Equipment = model<IEquipment>('Equipment', EquipmentSchema);
