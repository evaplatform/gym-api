import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { ITimeStamps } from '../../shared/interfaces/ITimeStamps';

export interface IBodyBuildingByUser extends ITimeStamps  {
  id: string;
  exerciseId: string; // point to exercise collection
  plan: [
    {
      exerciseId: string; // point to exercise collection
      clientWeight: number;
      repetitions: number;
      goal: string;
      weekDays?: WeekDaysEnum[];
    },
  ];
}
