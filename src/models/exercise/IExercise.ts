import { DistanceUnitEnum } from '@/shared/enums/DistanceUnitEnum';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';

export interface IExercise extends IDefaultEntityProperties {
  name: string; // unique
  academyId: IdType; // point to academy collection
  trainingIds: IdType[];
  description?: string;
  imagePath?: string;
  videoPath?: string;

  hasStopwatch?: boolean;
  hasGps?: boolean;

  // cardio
  distance?: number;
  distanceUnit?: DistanceUnitEnum; // e.g., kilometers, miles

  // bodybuilding | mobility | stretching
  clientWeight?: number;
  repetitions?: number[];
  sets?: number;

  // all types
  exerciseOrientations?: string;
  restTimeBetweenSets?: number;
  duration?: number;
  goal?: string;
}
