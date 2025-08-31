// src/services/UserService.ts
import { AppError } from '../../errors/AppError';
import { IPaymentInfo } from '../../models/paymentInfo/IPaymentInfo';
import { IPaymentInfoRepository } from '../../repositories/paymentInfo/IPaymentInfoRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IPaymentInfoService } from './IPaymentInfoService';

export class PaymentInfoServiceImpl implements IPaymentInfoService {
  constructor(private readonly paymentInfoRepository: IPaymentInfoRepository) { }

  async getAll(): Promise<IPaymentInfo[]> {
    return this.paymentInfoRepository.getAll();
  }

  async create(paymentInfo: IPaymentInfo): Promise<IPaymentInfo> {
    return this.paymentInfoRepository.create(paymentInfo);
  }

  async update(paymentInfo: IPaymentInfo): Promise<IPaymentInfo | null> {
    return this.paymentInfoRepository.update(paymentInfo.id, paymentInfo);
  }

  async getById(id: string): Promise<IPaymentInfo | null> {
    return this.paymentInfoRepository.getById(id);
  }

  async delete(id: string): Promise<void | null> {
    const paymentInfo = await this.paymentInfoRepository.getById(id);

    if (!paymentInfo) {
      throw new AppError('Academy not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.paymentInfoRepository.delete(id);
  }


}
