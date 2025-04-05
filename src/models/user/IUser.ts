import { IBodyBuildingInfoByUser } from "./IBodyBuildingInfoByUser";
import { IPaymentInfo } from "./IPaymentInfo";
import { ICardioByUser as ICardioPlan } from "./ICardioByUser";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string; // unique
    password: string;
    profilePhoto?: string;

    groupId?: string; // point to group collection
    bodyBuildingInfoByUser?: IBodyBuildingInfoByUser[];
    cardioPlan?: ICardioPlan[];
    academyId?: string;
    paymentInfo?: IPaymentInfo
    createdAt: Date;
    updatedAt?: Date;
}
