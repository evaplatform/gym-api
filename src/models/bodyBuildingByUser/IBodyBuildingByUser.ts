import { IBodyBuildingPlanByUser } from '@/shared/interfaces/IBodyBuildingPlanByUser';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface IBodyBuildingByUser extends IDefaultEntityProperties {
  userId: IdType; // point to user collection
  academyId: IdType; // point to academy collection
  plan: IBodyBuildingPlanByUser[];
}
