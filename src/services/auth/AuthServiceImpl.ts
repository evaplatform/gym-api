import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';

import { AuthResponseType } from '../../shared/types/AuthResponse';
import { IAuthService } from './IAuthService';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async signin(userInput: IUser): Promise<AuthResponseType> {
    const foundUser = await this.userRepository.getByEmail(userInput.email);

    if (!foundUser) {
      throw new AppError('Invalid credentials', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    if (foundUser.academyId?.toString() !== userInput.academyId) {
      throw new AppError('Invalid credentials', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(userInput.password, foundUser.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    // create a JWT token
    const token = jwt.sign(
      { id: foundUser.id, role: foundUser.groupId },
      process.env.JWT_SECRET as string
    );

    const { password: _, ...userWithoutPassword } = foundUser;

    const userWithToken: AuthResponseType = {
      ...userWithoutPassword,
      token,
    };

    return userWithToken;
  }

  async signout(userInput: IUser): Promise<void> {
    // // aqui poderia ter validações
    // return this.userRepository.create(user);
  }
}
