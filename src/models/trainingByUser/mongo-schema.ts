import mongoose from 'mongoose';
import { ITrainingByUser } from './ITrainingByUser';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';

const TrainingByUserSchema = new mongoose.Schema<ITrainingByUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'The ID of the associated user.'
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'The ID of the associated academy.'
    },
    trainingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Training',
      required: true,
      description: 'The IDs of the associated trainings.'
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

export const TrainingByUserModel = mongoose.model<ITrainingByUser>('TrainingByUser', TrainingByUserSchema);
