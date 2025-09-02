import mongoose from 'mongoose';
import { IExerciseBlock } from './IExerciseBlock';
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const ExerciseBlockSchema = new mongoose.Schema<IExerciseBlock>(
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
      required: false, 
      description: 'The ID of the associated academy.' 
    },
    exerciseType: { 
      type: String, 
      enum: Object.values(BlockTypeEnum), 
      required: true, 
      description: 'The type of exercise block, must be one of the predefined BlockTypeEnum values.' 
    },
  }, 
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const ExerciseBlockModel = mongoose.model<IExerciseBlock>('ExerciseBlock', ExerciseBlockSchema);
