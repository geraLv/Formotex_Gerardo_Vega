import { User } from '../models/User';
import { ApiError } from '../utils/apiResponse';

export async function listUsers() {
  return User.find().select('-password');
}

export async function getUser(id: string) {
  const user = await User.findById(id).select('-password');
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  return user;
}

export async function updateUser(id: string, payload: Partial<{ name: string; role: 'admin' | 'user'; isActive: boolean }>) {
  const user = await User.findByIdAndUpdate(id, payload, { new: true }).select('-password');
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  return user;
}

export async function removeUser(id: string) {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
}
