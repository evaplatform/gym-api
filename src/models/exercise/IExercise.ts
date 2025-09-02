import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface IExercise  extends IDefaultEntityProperties   {
  name: string; // unique
  academyId: IdType; // point to academy collection
  exerciseBlockId: IdType;
  description?: string;
  imagePath?: string;
  videoPath?: string;
}
