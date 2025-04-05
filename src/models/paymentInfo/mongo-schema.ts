import mongoose from "mongoose";
import { IPaymentInfo } from "./IPaymentInfo";

export const paymentInfoSchema = new mongoose.Schema<IPaymentInfo>({
    monthlyFee: { type: Number, required: true },
    checkingAccount: { type: Number, required: true },
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    isFree: { type: Boolean, required: true }
})

// it does not have a mongoose model because it is not a collection