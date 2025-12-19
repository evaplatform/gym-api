
import { IdType } from '../../shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';

export interface ITrainingByUser extends IDefaultEntityProperties {
  userId: IdType;
  academyId: IdType;
  weekDays?: WeekDaysEnum[];
}
