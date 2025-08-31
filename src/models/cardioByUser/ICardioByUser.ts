import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { ITimeStamps } from '../../shared/interfaces/ITimeStamps';

export interface ICardioByUser extends ITimeStamps  {
  exerciseId: string; // point to exercise collection
  plan: {
    speed: number; // speed in minutes
    distance: number; // Distance in kilometers
    initialDate: Date;
    finalDate: Date;
    weekDays: WeekDaysEnum[];
  }[];
}
