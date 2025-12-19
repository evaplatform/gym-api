import { IdType } from "@/shared/types/IdType";
import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaultEntityProperties";

export interface IGroup extends IDefaultEntityProperties {
  name: string; // unique
  academyId: IdType; // point to academy collection
  permissions: {
    drawerMenu: {
      drawer: boolean;
    };
  };
}
