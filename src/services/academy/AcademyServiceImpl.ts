// src/services/UserService.ts
import { AppError } from '../../errors/AppError';
import { deleteAWSFile } from '../../middlewares/multer-s3';
import { IAcademy } from '../../models/academy/IAcademy';
import { IAcademyRepository } from '../../repositories/academy/IAcademyRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IAcademyService } from './IAcademyService';

export class AcademyServiceImpl implements IAcademyService {
  constructor(private readonly academyRepository: IAcademyRepository) { }

  async getAcademies(): Promise<IAcademy[]> {
    return this.academyRepository.getAll();
  }

  async create(user: IAcademy): Promise<IAcademy> {
    // aqui poderia ter validações
    return this.academyRepository.create(user);
  }

  async update(user: IAcademy): Promise<IAcademy | null> {
    return this.academyRepository.update(user.id, user);
  }


  async getById(id: string): Promise<IAcademy | null> {
    return this.academyRepository.getById(id);
  }

  async delete(id: string): Promise<void | null> {
    const academy = await this.academyRepository.getById(id);

    if (!academy) {
      throw new AppError('Academy not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.academyRepository.delete(id);

    if (academy.logoImage) {
      await deleteAWSFile(academy.logoImage)
    }
  }
}
