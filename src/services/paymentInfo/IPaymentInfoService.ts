import { IPaymentInfo } from '../../models/paymentInfo/IPaymentInfo';

export interface IPaymentInfoService {
  getAll(): Promise<IPaymentInfo[]>;
  create(user: IPaymentInfo): Promise<IPaymentInfo>;
  update(user: IPaymentInfo): Promise<IPaymentInfo | null>;
  delete(id: string): Promise<void | null>;
  getById(id: string): Promise<IPaymentInfo | null>;
}
