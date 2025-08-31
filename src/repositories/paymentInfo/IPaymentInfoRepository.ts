import { IPaymentInfo } from '../../models/paymentInfo/IPaymentInfo';

export interface IPaymentInfoRepository {
  getById(id: string): Promise<IPaymentInfo | null>;
  getAll(): Promise<IPaymentInfo[]>;
  create(user: IPaymentInfo): Promise<IPaymentInfo>;
  update(id: string, user: Partial<IPaymentInfo>): Promise<IPaymentInfo | null>;
  delete(id: string): Promise<void | null>;
}
