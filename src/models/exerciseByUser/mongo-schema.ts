import mongoose from 'mongoose';
import { IExerciseByUser } from './IExerciseByUser';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { DistanceUnitEnum } from '@/shared/enums/DistanceUnitEnum';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';

export const ExerciseByUserSchema = new mongoose.Schema<IExerciseByUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'Unique identifier for the exercise',
      maxlength: 50
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'The ID of the academy this group belongs to'
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
      description: 'Unique identifier for the exercise',
      maxlength: 50
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
    repetitions: {
      type: Number,
      required: false,
      description: 'Number of repetitions for the exercise',
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
    weekDays: [{
      type: String,
      enum: Object.values(WeekDaysEnum),
      description: 'Days of the week for the exercise',
      maxlength: 20
    }],
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const ExerciseByUserModel = mongoose.model<IExerciseByUser>('ExerciseByUser', ExerciseByUserSchema);
