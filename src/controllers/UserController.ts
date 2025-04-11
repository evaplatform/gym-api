// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { UserServiceImpl } from '../services/user/UserServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';



const userService = new UserServiceImpl(new UserRepositoryImpl());
export class UserController {
  @CatchErrors
  @Authenticate
  static async getAll(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  }

  @CatchErrors
  @Authenticate
  static async getById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(HttpStatusCodeEnum.NOT_FOUND).send('User not found');
    }
  }

  @CatchErrors
  @Authenticate
  static async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(HttpStatusCodeEnum.CREATED).json(user);
  }

  @CatchErrors
  @Authenticate
  static async update(req: Request, res: Response) {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(HttpStatusCodeEnum.OK).json(user);
    } else {
      res.status(HttpStatusCodeEnum.NOT_FOUND).send('User not found');
    }
  }

  @CatchErrors
  @Authenticate
  static async delete(req: Request, res: Response) {
    await userService.delete(req.params.id);
    res.status(HttpStatusCodeEnum.OK).json({ message: 'User deleted successfully' }); 
  }
}
