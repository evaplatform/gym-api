import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { AuthServiceImpl } from '../services/auth/AuthServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { log } from '../shared/utils/log';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IRefreshToken } from '@/shared/interfaces/IRefreshToken';
import { UserServiceImpl } from '@/services/user/UserServiceImpl';

const userRepository = new UserRepositoryImpl();
const authService = new AuthServiceImpl(userRepository, new UserServiceImpl(userRepository));

export class AuthController {
  @CatchErrors
  static async signinOurCreate(req: Request, res: Response) {
    const response = await authService.signinOrCreate(req.body);
    log("User signed in or created successfully");
    res.json(response);
  }

  @CatchErrors
  @Authenticate
  static async signout(req: AuthenticatedRequest, res: Response) {
    await authService.signout(req);
    res.json({ message: 'Signed out successfully' });
  }

  @CatchErrors
  static async generateTestToken(req: AuthenticatedRequest<{ userId: string; email: string; isAdmin: boolean }>, res: Response) {
    const response = await authService.generateTestToken(req);

    res.json(response);
  }

  @CatchErrors
  static async refreshToken(req: AuthenticatedRequest<IRefreshToken>, res: Response) {
    const response = await authService.refreshToken(req);

    res.json(response);
  }
}
