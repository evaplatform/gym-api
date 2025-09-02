import mongoose from 'mongoose';
import { IGroup } from './IGroup';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    name: { 
      type: String, 
      required: true, 
      unique: false, 
      maxlength: 100, 
      description: 'The name of the group, must be unique and up to 100 characters long.' 
    },
    permissions: {
      drawerMenu: {
        drawer: { 
          type: Boolean, 
          default: false, 
          description: 'Indicates whether the drawer menu is accessible.' 
        },
      },
    },
  }, { ...MONGO_DEFAULT_PROPERTIES });

export const GroupModel = mongoose.model<IGroup>('Group', GroupSchema);
