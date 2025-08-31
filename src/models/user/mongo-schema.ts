// src/models/User.ts
import mongoose from 'mongoose';
import { IUser } from './IUser';
import { googleUserInfoSchema } from './google-user-info-mongo-schema';

const UserSchema = new mongoose.Schema<IUser>(
  {
    cpf: { type: String, required: true, unique: true, maxlength: 11, minlength: 11 },
    phoneNumber: { type: String, required: true, unique: true, maxlength: 15, minlength: 10 },
    googleUserInfo: googleUserInfoSchema,
    isAdmin: { type: Boolean, required: true, default: false },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    academyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Academy', default: null },
    // bodyBuildingByUser: [BodyBuildingByUserSchema],
    // cardioByUser: [CardioByUserSchema],
    // paymentInfo: paymentInfoSchema,
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
