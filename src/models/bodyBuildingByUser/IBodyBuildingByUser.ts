import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface IBodyBuildingByUser extends IDefaultEntityProperties {
  exerciseId: IdType; // point to exercise collection
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
