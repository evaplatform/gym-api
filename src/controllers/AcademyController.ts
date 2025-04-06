import { Request, Response } from 'express';
import { AcademyService } from '../services/academy/AcademyServiceImpl';
import { AcademyRepositoryImpl } from '../repositories/academy/AcademyRepositoryImpl';
import { CatchErrors } from '../shared/decorators/catch-errors';

const academyService = new AcademyService(new AcademyRepositoryImpl());

export class AcademyController {
  @CatchErrors()
  static async getAll(req: Request, res: Response) {
    const users = await academyService.getAcademies();
    res.json(users);
  }

  @CatchErrors()
  static async create(req: Request, res: Response) {
    const user = await academyService.createAcademy(req.body);
    res.status(201).json(user);
  }
}
