import { WeekDaysEnum } from "../enums/WeekDayEnum";

export interface IBodyBuildingPlanByUser {
    exerciseId: string; 
    clientWeight: number;
    repetitions: number;
    goal: string;
    weekDays?: WeekDaysEnum[];
}