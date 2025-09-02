
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';
import { IdType } from '../../shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';

export interface IExerciseBlock extends IDefaultEntityProperties {
  name: string;
  imagePath?: string;
  academyId: IdType;
  exerciseType: BlockTypeEnum;
}
