import { IdType } from "@/shared/types/IdType";
import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaultEntityProperties";

export interface PermissionNode {
  permitted: boolean;
}

export interface IGroupPermissions {
  changeAcademy: {
    permitted: boolean;
  }
  drawerMenu: {
    permitted: boolean;
    home: {
      permitted: boolean;
      tabs: {
        permitted: boolean;
        home: PermissionNode;
        calendar: PermissionNode;
        exercises: {
          permitted: boolean;
          finalizeTrainingButton: PermissionNode;
          finalizeExerciseButton: PermissionNode;
          userGpsButton: PermissionNode;
        };
        cardio: PermissionNode;
        financial: PermissionNode;
      };
    };
    users: {
      permitted: boolean;
      visualize: PermissionNode;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
    academies: {
      permitted: boolean;
      visualize: PermissionNode;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
    exercises: {
      permitted: boolean;
      visualize: PermissionNode;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
    trainings: {
      permitted: boolean;
      visualize: PermissionNode;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
    trainingByUserList: {
      permitted: boolean;
      visualize: PermissionNode;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
    userSettings: {
      permitted: boolean;
      resetDataButton: PermissionNode;
    };
    charts: {
      visualize: PermissionNode;
      permitted: boolean;
      deleteHistoryButton: PermissionNode;
      deleteAllHistoryButton: PermissionNode;
    };
    groups: {
      changeAcademyButton: PermissionNode;
      permitted: boolean;
      add: PermissionNode;
      delete: PermissionNode;
      update: PermissionNode;
    };
  };
}

export interface IGroup extends IDefaultEntityProperties {
  name: string; // unique
  academyId: IdType; // point to academy collection
  permissions: IGroupPermissions
}

