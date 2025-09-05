// src/models/User.ts
import mongoose from 'mongoose';
import { IUser } from './IUser';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { 
      type: String, 
      required: true, 
      maxlength: 100, 
      description: 'The full name of the user, maximum length of 100 characters.' 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      maxlength: 255, 
      description: 'The email address of the user, must be unique and have a maximum length of 255 characters.' 
    },
    profilePhoto: { 
      type: String, 
      required: false, 
      maxlength: 500, 
      description: 'The URL of the user\'s profile photo, maximum length of 500 characters.' 
    },
    cpf: { 
      type: String, 
      required: true, 
      unique: true, 
      maxlength: 14, 
      minlength: 14, 
      description: 'The CPF (Brazilian individual taxpayer registry identification) of the user, must be 14 characters long and unique (with dots and dashes).' 
    },
    phoneNumber: { 
      type: String, 
      required: false, 
      unique: true, 
      maxlength: 15, 
      minlength: 10, 
      description: 'The phone number of the user, must be unique and have a length between 10 and 15 characters.' 
    },
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false, 
      description: 'Indicates whether the user has administrative privileges.' 
    },
    groupId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Group', 
      default: null, 
      description: 'The ID of the group the user belongs to, if any.' 
    },
    academyId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Academy', 
      default: null, 
      description: 'The ID of the academy the user is associated with, if any.' 
    },
  }, { ...MONGO_DEFAULT_PROPERTIES }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
