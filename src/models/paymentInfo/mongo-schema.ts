import mongoose from 'mongoose';
import { IPaymentInfo } from './IPaymentInfo';

export const paymentInfoSchema = new mongoose.Schema<IPaymentInfo>({
  academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  monthlyFee: { type: Number, required: true },
  checkingAccount: { type: String, required: true },
  cardHolderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  isFree: { type: Boolean, required: true },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export const PaymentModel = mongoose.model<IPaymentInfo>('PaymentInfo', paymentInfoSchema);
