// src/services/UserService.ts
import { IAcademy } from '../../models/academy/IAcademy';
import { IAcademyRepository } from '../../repositories/academy/IAcademyRepository';
import { IAcademyService } from './IAcademyService';

export class AcademyService implements IAcademyService {
  constructor(private readonly userRepository: IAcademyRepository) {}

  async getAcademies(): Promise<IAcademy[]> {
    return this.userRepository.getAll();
  }

  async createAcademy(user: IAcademy): Promise<IAcademy> {
    // aqui poderia ter validações
    return this.userRepository.create(user);
  }
}
