import mongoose from 'mongoose';
import { IExercise } from './IExercise';

const ExerciseSchema = new mongoose.Schema<IExercise>(
  {
    name: { type: String, required: true },
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', required: false },
    exerciseBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseBlock', required: true },
    description: { type: String, default: null },
    imagePath: { type: String, default: null },
    videoPath: { type: String, default: null },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const ExerciseModel = mongoose.model<IExercise>('Exercise', ExerciseSchema);
