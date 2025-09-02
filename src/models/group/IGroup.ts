import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaulEntityProperties";

export interface IGroup  extends IDefaultEntityProperties  {
  name: string; // unique
  permissions: {
    drawerMenu: {
      drawer: boolean;
    };
  };
}
