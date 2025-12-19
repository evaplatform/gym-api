import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaultEntityProperties";

export interface IAcademy extends IDefaultEntityProperties  {
  name: string;
  location: string;
  phoneNumber: string;
  imagePath?: string;
  userLimit: number;
}
