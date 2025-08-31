import { ITimeStamps } from "../../shared/interfaces/ITimeStamps";

export interface IGroup extends ITimeStamps  {
  id: string;
  name: string; // unique
  permissions: {
    drawerMenu: {
      drawer: boolean;
    };
  };
}
