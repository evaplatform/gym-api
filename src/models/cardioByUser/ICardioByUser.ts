import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface ICardioByUser extends IDefaultEntityProperties   {
  exerciseId: IdType; // point to exercise collection
  userId: IdType; // point to user collection
  academyId: IdType; // point to academy collection
  plan: {
    speed: number; // speed in minutes
    distance: number; // Distance in kilometers
    initialDate: Date;
    finalDate: Date;
    weekDays: WeekDaysEnum[];
  }[];
}
