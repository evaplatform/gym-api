import { IExercise } from "../../models/exercise/IExercise";

export interface IExerciseExtendedProps extends IExercise {
  academyName?: string;
}