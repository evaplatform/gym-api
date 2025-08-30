import { Types } from 'mongoose';
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseBlock {
  id: string;
  name: string; 
  imagePath: string;
  academyId: IdType;
  exerciseType: BlockTypeEnum;
  createdAt: Date;
  updatedAt?: Date;
}
