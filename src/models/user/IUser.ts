import { IGoogleUserInfo } from '../../shared/interfaces/IGoogleUserInfo';
import { ITimeStamps } from '../../shared/interfaces/ITimeStamps';

export interface IUser extends ITimeStamps {
  id: string;
  cpf?: string; // unique
  phoneNumber?: string; // unique
  googleUserInfo?: IGoogleUserInfo;
  isAdmin:boolean
  groupId?: string; // point to group collection
  // bodyBuildingByUser?: IBodyBuildingByUser[];
  // cardioByUser?: ICardioByUser[];
  academyId?: string;
  // paymentInfo?: IPaymentInfo;
}
