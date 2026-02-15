import { IdType } from '@/shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaultEntityProperties';

export interface IUser extends IDefaultEntityProperties {
  name: string;
  email: string; // unique
  isAdmin: boolean
  profilePhoto?: string;
  phoneNumber?: string; // unique
  groupIds?: string[]; // point to group collection
  cpf?: string; // unique
  academyId: IdType;
  refreshToken?: string; // token to refresh Google OAuth tokens
}


