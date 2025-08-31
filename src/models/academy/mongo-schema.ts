import mongoose from 'mongoose';
import { IAcademy } from './IAcademy';
import { paymentInfoSchema } from '../paymentInfo/mongo-schema';

const AcademySchema = new mongoose.Schema<IAcademy>(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    imagePath: { type: String, required: true },
    // exerciseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    // exerciseBlockIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseBlock' }],
    // groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    userLimit: { type: Number, required: true },
    paymentInfo: paymentInfoSchema,
  },
  { timestamps: true }
);

export const AcademyModel = mongoose.model<IAcademy>('Academy', AcademySchema);
