export interface IPaymentInfo {
    id: string;
    monthlyFee: number;
    checkingAccount: number;
    cardHolderName: string
    cardNumber: string // Ideally encrypted
    expiryDate: string
    cvv: string // Ideally encrypted
    isFree: boolean;
    createdAt: Date;
    updatedAt?: Date;
}