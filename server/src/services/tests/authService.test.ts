import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import * as userService from '../userService';
import * as userModel from '../../models/userModel';

jest.mock('../../models/userModel');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user if email and username are unique', async () => {
    (userModel.findUserByEmail as any).mockResolvedValue(null);
    (userModel.findUserByUsername as any).mockResolvedValue(null);
    (userModel.createUser as any).mockResolvedValue({ id: 1, email: 'test@example.com' });

    const token = await userService.registerUser({ 
      email: 'test@example.com', 
      username: 'tester', 
      password: 'pass', 
      firstName: 'Test', 
      lastName: 'User', 
      choir: 'KK', 
      voice: 'A1' 
    });

    expect(token)
  });
});