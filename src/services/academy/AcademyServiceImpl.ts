// src/services/UserService.ts
import { IAcademy } from '../../models/academy/IAcademy';
import { IAcademyRepository } from '../../repositories/academy/IAcademyRepository';
import { IAcademyService } from './IAcademyService';

export class AcademyServiceImpl implements IAcademyService {
  constructor(private readonly userRepository: IAcademyRepository) { }

  async getAcademies(): Promise<IAcademy[]> {
    return this.userRepository.getAll();
  }

  async create(user: IAcademy): Promise<IAcademy> {
    // aqui poderia ter validações
    return this.userRepository.create(user);
  }

  async update(user: IAcademy): Promise<IAcademy | null> {
    return this.userRepository.update(user.id, user);
  }

  delete(id: string): Promise<void | null> {
    return this.userRepository.delete(id);
  }
  getById(id: string): Promise<IAcademy | null> {
    return this.userRepository.getById(id);
  }
}
