import mongoose from 'mongoose';
import { IBodyBuildingByUser } from './IBodyBuildingByUser';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

export const BodyBuildingByUserSchema = new mongoose.Schema<IBodyBuildingByUser>(
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
        exerciseId: { 
          type: String, 
          required: true, 
          description: 'Unique identifier for the exercise in the plan', 
          maxlength: 50 
        },
        clientWeight: { 
          type: Number, 
          required: true, 
          description: 'Weight of the client for the exercise', 
          maxlength: 10 
        },
        repetitions: { 
          type: Number, 
          required: true, 
          description: 'Number of repetitions for the exercise', 
          maxlength: 10 
        },
        goal: { 
          type: String, 
          required: true, 
          description: 'Goal for the exercise', 
          maxlength: 100 
        },
        weekDays: [{ 
          type: String, 
          description: 'Days of the week for the exercise', 
          maxlength: 20 
        }],
      },
    ],
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

// it does not have a mongoose model because it is not a collection
