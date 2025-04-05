import mongoose from 'mongoose';
import { IExercise } from './IExercise';

const ExerciseSchema = new mongoose.Schema<IExercise>(
  {
    name: { type: String, required: true, unique: true },
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', required: true },
    exerciseBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseBlock', required: true },
    description: { type: String, default: null },
    video: { type: String, default: null },
    imagePath: { type: String, default: null },
    videoPath: { type: String, default: null },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const ExerciseModel = mongoose.model<IExercise>('Exercise', ExerciseSchema);
