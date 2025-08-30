import mongoose from 'mongoose';
import { IExerciseBlock } from './IExerciseBlock';
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';

const ExerciseBlockSchema = new mongoose.Schema<IExerciseBlock>(
  {
    name: { type: String, required: true },
    imagePath: { type: String, required: false },
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', required: false },
    exerciseType: { type: String, enum: Object.values(BlockTypeEnum), required: true },
  },
  {
    timestamps: true,
  }
);

export const ExerciseBlockModel = mongoose.model<IExerciseBlock>('ExerciseBlock', ExerciseBlockSchema);
