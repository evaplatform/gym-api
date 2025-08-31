// src/repositories/UserRepository.ts
import { IPaymentInfo } from '../../models/paymentInfo/IPaymentInfo';
import { PaymentModel } from '../../models/paymentInfo/mongo-schema';
import { IPaymentInfoRepository } from './IPaymentInfoRepository';

export class PaymentInfoRepositoryImpl implements IPaymentInfoRepository {
    async update(id: string, paymentInfo: Partial<IPaymentInfo>): Promise<IPaymentInfo | null> {
        return PaymentModel.findByIdAndUpdate(id, { $set: paymentInfo }, { new: true });
    }

    async getById(id: string): Promise<IPaymentInfo | null> {
        return PaymentModel.findById(id);
    }

    async getAll(): Promise<IPaymentInfo[]> {
        return PaymentModel.find();
    }

    async create(exercise: IPaymentInfo): Promise<IPaymentInfo> {
        return (await PaymentModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return PaymentModel.findByIdAndDelete(id);
    }
}
