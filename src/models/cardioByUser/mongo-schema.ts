import mongoose, { mongo } from 'mongoose';
import { ICardioByUser } from './ICardioByUser';
import { WeekDaysEnum } from '../../shared/enums/WeekDayEnum';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';


export const CardioByUserSchema = new mongoose.Schema<ICardioByUser>(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
      description: 'Unique identifier for the exercise',
      maxlength: 50
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'Unique identifier for the user',
      maxlength: 50
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'The ID of the academy this group belongs to'
    },
    plan: [
      {
        speed: {
          type: Number,
          required: true,
          description: 'Speed in minutes',
          max: 999
        },
        distance: {
          type: Number,
          required: true,
          description: 'Distance in kilometers',
          max: 999
        },
        initialDate: {
          type: Date,
          required: true,
          description: 'Start date of the plan'
        },
        finalDate: {
          type: Date,
          required: true,
          description: 'End date of the plan'
        },
        weekDays: [{
          type: String,
          enum: Object.values(WeekDaysEnum),
          required: true,
          description: 'Days of the week the plan is active',
          maxlength: 10
        }],
      },
    ],
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const CardioByUserModel = mongoose.model<ICardioByUser>('CardioByUser', CardioByUserSchema);
