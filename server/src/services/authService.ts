import { userModel } from '@db';
import { generateToken } from '@utils/generateToken';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface LoginInput {
  identifier: string; // email or username
  type: 'email' | 'username';
  password: string;
}

export const loginUser = async ({ identifier, type, password }: LoginInput) => {
  const user =
    type === 'email'
      ? await userModel.findByEmail(identifier)
      : await userModel.findByUsername(identifier);

  if (!user) {
    throw new Error('User not found');
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  return generateToken(user.id);
};

interface JwtPayload {
  id: number;
}

export const authenticateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded) {
      return null;
    }
    const user = await userModel.findById(decoded.id);
    return user ? { id: user.id, username: user.username, email: user.email } : null;
  } catch (err) {
    return null;
  }
};
