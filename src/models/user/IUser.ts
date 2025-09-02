import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';

export interface IUser extends IDefaultEntityProperties {
  name: string;
  email: string; // unique
  profilePhoto?: string;
  cpf?: string; // unique
  phoneNumber?: string; // unique
  isAdmin: boolean
  groupId?: string; // point to group collection
  academyId?: string;
}


