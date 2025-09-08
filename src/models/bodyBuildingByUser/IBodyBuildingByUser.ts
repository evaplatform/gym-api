import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface IBodyBuildingByUser extends IDefaultEntityProperties {
  exerciseId: IdType; // point to exercise collection
  userId: IdType; // point to user collection
  academyId: IdType; // point to academy collection
  plan: [
    {
      clientWeight: number;
      repetitions: number;
      goal: string;
      weekDays?: WeekDaysEnum[];
    },
  ];
}
