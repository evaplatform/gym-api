import { IAcademy } from '../../models/academy/IAcademy';

export interface IAcademyRepository {
  getAll(): Promise<IAcademy[]>;
  create(user: IAcademy): Promise<IAcademy>;
  update(id: string, user: Partial<IAcademy>): Promise<IAcademy | null>;
  getById(id: string): Promise<IAcademy | null>;
  delete(id: string): Promise<void | null>;
  hasAcademy(name: string): Promise<IAcademy | null>;
}
