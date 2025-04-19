import { IAcademy } from '../../models/academy/IAcademy';

export interface IAcademyService {
  getAcademies(): Promise<IAcademy[]>;
  create(user: IAcademy): Promise<IAcademy>;
  update(user: IAcademy): Promise<IAcademy | null>;
  delete(id: string): Promise<void | null>;
  getById(id: string): Promise<IAcademy | null>;
  hasAcademy(name: string): Promise<boolean>;
}
