import { WeekDaysEnum } from "../../shared/enums/WeekDayEnum";

export interface IBodyBuildingByUser {
    id: string;
    exerciseId: string; // point to exercise collection
    plan: [
        {
            exerciseId: string; // point to exercise collection
            clientWeight: number;
            repetitions: number;
            goal: string;
            weekDays?: WeekDaysEnum[]
        },
    ]
    createdAt: Date;
    updatedAt?: Date;
}
