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
    // try {
    //   if (academy.imagePath) {
    //     await deleteAWSFile(academy.imagePath)
    //   }
    // } catch (error) {
    //   throw new AppError('Image delete on database. Failed to delete image on AWS', HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
    // }
  }

  async hasAcademy(name: string): Promise<boolean> {
    const hasAcademy = !!(await this.academyRepository.hasAcademy(name));
    if (!hasAcademy) {
      throw new AppError('Academy not found', HttpStatusCodeEnum.NOT_FOUND);
    }
    return hasAcademy;
  }
}
