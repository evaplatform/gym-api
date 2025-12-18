import mongoose from 'mongoose';
import { IExercise } from './IExercise';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { DistanceUnitEnum } from '@/shared/enums/DistanceUnitEnum';

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
    },
    distance: {
      type: Number,
      required: false,
      description: 'Distance covered in the exercise',
      maxlength: 10
    },
    distanceUnit: {
      type: String,
      required: false,
      enum: Object.values(DistanceUnitEnum),
      description: 'Unit of distance (e.g., kilometers, miles)',
      maxlength: 20
    },
    clientWeight: {
      type: Number,
      required: false,
      description: 'Weight of the client for the exercise',
      maxlength: 10
    },
    repetitions: [{
      type: Number,
      required: false,
      description: 'Array of repetitions for the exercise',
      maxlength: 10
    }],
    sets: {
      type: Number,
      required: false,
      description: 'Number of repetitions for the exercise',
      maxlength: 10
    },
    exerciseOrientations: {
      type: String,
      required: false,
      description: 'Orientations for the exercise',
      maxlength: 500
    },
    restTimeBetweenSets: {
      type: Number,
      required: false,
      description: 'Rest time between sets in seconds',
      maxlength: 10
    },
    duration: {
      type: Number,
      required: false,
      description: 'Number of repetitions for the exercise',
      maxlength: 10
    },
    goal: {
      type: String,
      required: false,
      description: 'Goal for the exercise',
      maxlength: 100
    },
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const ExerciseModel = mongoose.model<IExercise>('Exercise', ExerciseSchema);
