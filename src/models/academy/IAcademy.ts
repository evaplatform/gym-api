import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaulEntityProperties";

export interface IAcademy extends IDefaultEntityProperties  {
  name: string;
  location: string;
  phoneNumber: string;
  imagePath?: string;
  userLimit: number;
}
