import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';

export interface ICardioByUser {
  exerciseId: string; // point to exercise collection
  plan: {
    speed: number; // speed in minutes
    distance: number; // Distance in kilometers
    initialDate: Date;
    finalDate: Date;
    weekDays: WeekDaysEnum[];
  }[];
}
