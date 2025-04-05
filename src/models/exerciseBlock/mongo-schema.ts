import mongoose from 'mongoose';
import { IExerciseBlock } from './IExerciseBlock';
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';

const ExerciseBlockSchema = new mongoose.Schema<IExerciseBlock>(
  {
    name: { type: String, required: true, unique: true },
    imagePath: { type: String, required: true },
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', required: true },
    exerciseType: { type: String, enum: Object.values(BlockTypeEnum), required: true },
  },
  {
    timestamps: true,
  }
);

export const ExerciseBlock = mongoose.model<IExerciseBlock>('ExerciseBlock', ExerciseBlockSchema);
