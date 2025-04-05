import { IAcademy } from "../../models/academy/IAcademy";

export interface IAcademyRepository {
  getAll(): Promise<IAcademy[]>;
  create(user: IAcademy): Promise<IAcademy>;
}
