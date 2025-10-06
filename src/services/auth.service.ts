import { User } from '../models/User';
import { signToken } from '../utils/jwt';
import { ApiError } from '../utils/apiResponse';

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Credenciales inválidas');
  const valid = await user.comparePassword(password);
  if (!valid) throw new ApiError(401, 'Credenciales inválidas');
  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function register(data: { name: string; email: string; password: string; role?: 'admin' | 'user' }) {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new ApiError(409, 'Email ya registrado');
  const user = await User.create(data);
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
