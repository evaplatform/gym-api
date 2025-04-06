// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user/UserServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { CatchErrors } from '../shared/decorators/catch-errors';

const userService = new UserService(new UserRepositoryImpl());

export class UserController {
  @CatchErrors()
  static async getAll(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  @CatchErrors()
  static async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }

  @CatchErrors()
  static async update(req: Request, res: Response) {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }
}
