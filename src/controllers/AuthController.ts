import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { AuthServiceImpl } from '../services/auth/AuthServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { log } from '../shared/utils/log';

const authService = new AuthServiceImpl(new UserRepositoryImpl());

export class AuthController {
  @CatchErrors
  static async signinOurCreate(req: Request, res: Response) {
    const response = await authService.signinOurCreate(req.body);
    log("User signed in or created successfully");
    res.json(response);
  }

  @CatchErrors
  @Authenticate
  static async signout(req: Request, res: Response) {
    // Signout logic can be implemented here
  }
}
