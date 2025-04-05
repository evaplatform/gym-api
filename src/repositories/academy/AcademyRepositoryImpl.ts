// src/repositories/UserRepository.ts
import { IAcademy } from "../../models/academy/IAcademy";
import { AcademyModel } from "../../models/academy/mongo-schema";
import { IAcademyRepository } from "./IAcademyRepository";

export class AcademyRepositoryImpl implements IAcademyRepository {
  async getAll(): Promise<IAcademy[]> {
    return AcademyModel.find();
  }

  async create(user: IAcademy): Promise<IAcademy> {
    return AcademyModel.create(user);
  }
}
