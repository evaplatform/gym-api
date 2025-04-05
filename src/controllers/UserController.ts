// src/controllers/UserController.ts
import { Request, Response } from "express";import { UserService } from "../services/UserServiceImpl";
import { UserRepositoryImpl } from "../repositories/user/UserRepositoryImpl";
;

const userService = new UserService(new UserRepositoryImpl());

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  }

  static async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }
}
