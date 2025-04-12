// src/repositories/UserRepository.ts
import { IAcademy } from '../../models/academy/IAcademy';
import { AcademyModel } from '../../models/academy/mongo-schema';
import { IAcademyRepository } from './IAcademyRepository';

export class AcademyRepositoryImpl implements IAcademyRepository {
  async update(id: string, user: Partial<IAcademy>): Promise<IAcademy | null> {
    return AcademyModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  }

  async getById(id: string): Promise<IAcademy | null> {
    return AcademyModel.findById(id);
  }

  async delete(id: string): Promise<void | null> {
    return AcademyModel.findByIdAndDelete(id);
  }

  async getAll(): Promise<IAcademy[]> {
    return AcademyModel.find();
  }

  async create(user: IAcademy): Promise<IAcademy> {
    return AcademyModel.create(user);
  }
}
