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

// it does not have a mongoose model because it is not a collection
