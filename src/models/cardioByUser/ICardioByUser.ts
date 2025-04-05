import { WeekDaysEnum } from "../../shared/enums/WeekDayEnum";

export interface ICardioByUser {
    id: string;
    exerciseId: string; // point to exercise collection
    plan: [
        {
            speed: number // speed in minutes
            distance: number // Distance in kilometers
            initialDate: Date;
            finalDate: Date;
            weekDays: WeekDaysEnum[]
        },
    ]
    createdAt: Date;
    updatedAt?: Date;
}