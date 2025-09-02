import mongoose from 'mongoose';
import { IAcademy } from './IAcademy';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const AcademySchema = new mongoose.Schema<IAcademy>(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true, 
      maxlength: 100, 
      description: 'The name of the academy (max 100 characters).' 
    },
    location: { 
      type: String, 
      required: true, 
      maxlength: 200, 
      description: 'The location of the academy (max 200 characters).' 
    },
    phoneNumber: { 
      type: String, 
      required: true, 
      maxlength: 15, 
      description: 'The phone number of the academy (max 15 characters).' 
    },
    imagePath: { 
      type: String, 
      required: false, 
      maxlength: 300, 
      description: 'The path to the academy image (max 300 characters).' 
    },
    userLimit: { 
      type: Number, 
      required: true, 
      description: 'The maximum number of users allowed in the academy.' 
    },
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const AcademyModel = mongoose.model<IAcademy>('Academy', AcademySchema);
