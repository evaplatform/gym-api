import { IAcademy } from "../../models/academy/IAcademy";

export interface IAcademyService {
  getAcademies(): Promise<IAcademy[]>;
  createAcademy(user: IAcademy): Promise<IAcademy>;
}
