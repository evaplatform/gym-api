import mongoose from 'mongoose';
import { IExercise } from './IExercise';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const ExerciseSchema = new mongoose.Schema<IExercise>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      description: 'The name of the exercise, maximum length of 100 characters.'
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'The ID of the academy associated with the exercise.'
    },
    trainingIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Training',
      required: true,
      description: 'The ID of the training this exercise belongs to.'
    }],
    description: {
      type: String,
      default: null,
      maxlength: 2000,
      description: 'A brief description of the exercise, maximum length of 2000 characters.'
    },
    imagePath: {
      type: String,
      default: null,
      maxlength: 255,
      description: 'The file path to the image representing the exercise, maximum length of 255 characters.'
    },
    videoPath: {
      type: String,
      default: null,
      maxlength: 255,
      description: 'The file path to the video demonstrating the exercise, maximum length of 255 characters.'
    },
    hasStopwatch: {
      type: Boolean,
      default: false,
      description: 'Indicates if the exercise includes a stopwatch feature.'
    },
    hasGps: {
      type: Boolean,
      default: false,
      description: 'Indicates if the exercise includes GPS tracking feature.'
    }
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const ExerciseModel = mongoose.model<IExercise>('Exercise', ExerciseSchema);
