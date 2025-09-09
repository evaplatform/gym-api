import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { AuthServiceImpl } from '../services/auth/AuthServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { log } from '../shared/utils/log';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';


const authService = new AuthServiceImpl(new UserRepositoryImpl());

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
}
