import { Request, Response } from 'express';
import { AcademyServiceImpl } from '../services/academy/AcademyServiceImpl';
import { AcademyRepositoryImpl } from '../repositories/academy/AcademyRepositoryImpl';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';

const academyService = new AcademyServiceImpl(new AcademyRepositoryImpl());

export class AcademyController {
  @CatchErrors
  @Authenticate
  static async getAll(req: Request, res: Response) {
    const users = await academyService.getAcademies();
    res.json(users);
  }

  @CatchErrors
  @Authenticate
  static async create(req: Request, res: Response) {
    const user = await academyService.create(req.body);
    res.status(HttpStatusCodeEnum.CREATED).json(user);
  }

  @CatchErrors
  @Authenticate
  static async update(req: Request, res: Response) {
    const user = await academyService.update(req.body);
    res.status(HttpStatusCodeEnum.OK).json(user);
  }

  @CatchErrors
  @Authenticate
  static async delete(req: Request, res: Response) {
    await academyService.delete(req.params.id);
    res.status(HttpStatusCodeEnum.OK).json({ message: 'User deleted successfully' });
  }

  @CatchErrors
  @Authenticate
  static async getById(req: Request, res: Response) {
    const user = await academyService.getById(req.params.id);
    res.status(HttpStatusCodeEnum.OK).json(user);
  }
}
