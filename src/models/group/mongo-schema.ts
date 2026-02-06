import mongoose from 'mongoose';
import { IGroup } from './IGroup';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';

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
      changeAcademy: {
        permitted: { type: Boolean, default: false }
      },
      drawerMenu: {
        permitted: { type: Boolean, default: false },
        home: {
          permitted: { type: Boolean, default: false },
          tabs: {
            home: {
              permitted: { type: Boolean, default: false }
            },
            calendar: {
              permitted: { type: Boolean, default: false }
            },
            exercises: {
              permitted: { type: Boolean, default: false },
              finalizeTrainingButton: { permitted: { type: Boolean, default: false } },
              finalizeExerciseButton: { permitted: { type: Boolean, default: false } },
              userGpsButton: { permitted: { type: Boolean, default: false } }
            },
            cardio: {
              permitted: { type: Boolean, default: false }
            },
            financial: {
              permitted: { type: Boolean, default: false }
            }
          }
        },
        users: {
          permitted: { type: Boolean, default: false },
          add: { permitted: { type: Boolean, default: false } },
          delete: { permitted: { type: Boolean, default: false } },
          update: { permitted: { type: Boolean, default: false } }
        },
        academies: {
          permitted: { type: Boolean, default: false },
          add: { permitted: { type: Boolean, default: false } },
          delete: { permitted: { type: Boolean, default: false } },
          update: { permitted: { type: Boolean, default: false } }
        },
        exercises: {
          permitted: { type: Boolean, default: false },
          add: { permitted: { type: Boolean, default: false } },
          delete: { permitted: { type: Boolean, default: false } },
          update: { permitted: { type: Boolean, default: false } }
        },
        trainings: {
          permitted: { type: Boolean, default: false },
          add: { permitted: { type: Boolean, default: false } },
          delete: { permitted: { type: Boolean, default: false } },
          update: { permitted: { type: Boolean, default: false } }
        },
        userSettings: {
          permitted: { type: Boolean, default: false },
          resetDataButton: { permitted: { type: Boolean, default: false } }
        },
        charts: {
          permitted: { type: Boolean, default: false },
          deleteHistoryButton: { permitted: { type: Boolean, default: false } },
          deleteAllHistoryButton: { permitted: { type: Boolean, default: false } }
        },
        groups: {
          permitted: { type: Boolean, default: false },
          changeAcademyButton: { permitted: { type: Boolean, default: false } },
          add: { permitted: { type: Boolean, default: false } },
          delete: { permitted: { type: Boolean, default: false } },
          update: { permitted: { type: Boolean, default: false } }
        }
      }
    }
  }, { ...MONGO_DEFAULT_PROPERTIES });

export const GroupModel = mongoose.model<IGroup>('Group', GroupSchema);
