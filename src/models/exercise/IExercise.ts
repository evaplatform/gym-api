import { IdType } from '../../shared/types/IdType';

export interface IExercise {
  id: string;
  name: string; // unique
  academyId: IdType; // point to academy collection
  exerciseBlockId: IdType;
  description?: string;
  imagePath?: string;
  videoPath?: string;
  createdAt: Date;
  updatedAt?: Date;
}
