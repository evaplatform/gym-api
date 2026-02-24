import mongoose from 'mongoose';
import { IGroup } from './IGroup';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

const PermissionNode = { permitted: { type: Boolean, default: false } };

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      description: 'The name of the group, must be unique and up to 100 characters long.'
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: false,
      description: 'The ID of the academy this group belongs to'
    },
    permissions: {
      changeAcademy: PermissionNode,
      drawerMenu: {
        permitted: { type: Boolean, default: false },
        home: {
          permitted: { type: Boolean, default: false },
          tabs: {
            permitted: { type: Boolean, default: false },
            home: PermissionNode,
            calendar: PermissionNode,
            exercises: {
              permitted: { type: Boolean, default: false },
              finalizeTrainingButton: PermissionNode,
              finalizeExerciseButton: PermissionNode,
              userGpsButton: PermissionNode
            },
            cardio: PermissionNode,
            financial: PermissionNode
          }
        },
        users: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        academies: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        exercises: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        trainings: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        trainingByUserList: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        userSettings: {
          permitted: { type: Boolean, default: false },
          resetDataButton: PermissionNode
        },
        charts: {
          permitted: { type: Boolean, default: false },
          visualize: PermissionNode,
          deleteHistoryButton: PermissionNode,
          deleteAllHistoryButton: PermissionNode
        },
        groups: {
          permitted: { type: Boolean, default: false },
          changeAcademyButton: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        }
      }
    }
  }, { ...MONGO_DEFAULT_PROPERTIES }
);

export const GroupModel = mongoose.model<IGroup>('Group', GroupSchema);
