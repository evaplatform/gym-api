import mongoose from 'mongoose';
import { ITraining } from './ITraining';
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';

const TrainingSchema = new mongoose.Schema<ITraining>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      description: 'The name of the exercise block, maximum length of 100 characters.'
    },
    imagePath: {
      type: String,
      required: false,
      maxlength: 255,
      description: 'The path to the image associated with the exercise block, maximum length of 255 characters.'
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'The ID of the associated academy.'
    },
    exerciseType: {
      type: String,
      enum: Object.values(BlockTypeEnum),
      required: true,
      description: 'The type of exercise block, must be one of the predefined BlockTypeEnum values.'
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

export const TrainingModel = mongoose.model<ITraining>('Training', TrainingSchema);
