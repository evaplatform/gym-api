import { ITimeStamps } from '../../shared/interfaces/ITimeStamps';
import { IdType } from '../../shared/types/IdType';

export interface IExercise extends ITimeStamps  {
  id: string;
  name: string; // unique
  academyId: IdType; // point to academy collection
  exerciseBlockId: IdType;
  description?: string;
  imagePath?: string;
  videoPath?: string;
}
