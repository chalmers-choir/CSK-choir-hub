import { userModel } from '@db';
import { generateToken } from '@utils/generateToken';
import bcrypt from 'bcryptjs';

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
