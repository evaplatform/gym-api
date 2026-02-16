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
        permitted: PermissionNode,
        home: {
          permitted: PermissionNode,
          tabs: {
            permitted: PermissionNode,
            home: PermissionNode,
            calendar: PermissionNode,
            exercises: {
              permitted: PermissionNode,
              finalizeTrainingButton: PermissionNode,
              finalizeExerciseButton: PermissionNode,
              userGpsButton: PermissionNode
            },
            cardio: PermissionNode,
            financial: PermissionNode
          }
        },
        users: {
          permitted: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        academies: {
          permitted: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        exercises: {
          permitted: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        trainings: {
          permitted: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        trainingByUserList: {
          permitted: PermissionNode,
          add: PermissionNode,
          delete: PermissionNode,
          update: PermissionNode
        },
        userSettings: {
          permitted: PermissionNode,
          resetDataButton: PermissionNode
        },
        charts: {
          permitted: PermissionNode,
          deleteHistoryButton: PermissionNode,
          deleteAllHistoryButton: PermissionNode
        },
        groups: {
          permitted: PermissionNode,
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
