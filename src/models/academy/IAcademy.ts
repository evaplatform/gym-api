import { IPaymentInfo } from '../paymentInfo/IPaymentInfo';

export interface IAcademy {
  id: string;
  name: string; // unique
  location: string;
  phoneNumber: string;
  logoImage?: string;
  exerciseIds?: string[]; // point to exercise collection
  exerciseBlockIds?: string[]; // point to exerciseBlock collection
  groupIds?: string[]; // point to group collection
  userLimit: number;
  paymentInfo?: IPaymentInfo;
  createdAt: Date;
  updatedAt?: Date;
}
