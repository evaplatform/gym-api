
import { IdType } from '../../shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaultEntityProperties';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';

export interface ITrainingByUser extends IDefaultEntityProperties {
  userId: IdType;
  academyId: IdType;
  trainingId: IdType;
  weekDays?: WeekDaysEnum[];
}
