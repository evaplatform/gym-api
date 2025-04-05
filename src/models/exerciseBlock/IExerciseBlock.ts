import { BlockTypeEnum } from "../../shared/enums/BlockTypeEnum";

export interface IExerciseBlock {
  id: string;
  name: string;  // unique
  imagePath: string;
  academyId: string;
  exerciseType: BlockTypeEnum;
  createdAt: Date;
  updatedAt?: Date;
}