import mongoose from 'mongoose';
import { IPaymentInfo } from './IPaymentInfo';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

export const paymentInfoSchema = new mongoose.Schema<IPaymentInfo>({
  academyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Academy', 
    required: true, 
    description: 'Reference to the academy associated with the payment info' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false, 
    description: 'Reference to the user associated with the payment info' 
  },
  monthlyFee: { 
    type: Number, 
    required: true, 
    description: 'Monthly fee amount for the payment info' 
  },
  checkingAccount: { 
    type: String, 
    required: true, 
    description: 'Checking account associated with the payment info', 
    maxlength: 50 
  },
  cardHolderName: { 
    type: String, 
    required: true, 
    description: 'Name of the cardholder', 
    maxlength: 100 
  },
  cardNumber: { 
    type: String, 
    required: true, 
    description: 'Credit card number', 
    maxlength: 16 
  },
  expirationDate: { 
    type: String, 
    required: true, 
    description: 'Expiration date of the credit card', 
    maxlength: 7 
  },
  cvv: { 
    type: String, 
    required: true, 
    description: 'CVV code of the credit card', 
    maxlength: 4 
  },
  isFree: { 
    type: Boolean, 
    required: true, 
    description: 'Indicates if the payment is free' 
  },
}, { ...MONGO_DEFAULT_PROPERTIES });

export const PaymentModel = mongoose.model<IPaymentInfo>('PaymentInfo', paymentInfoSchema);
