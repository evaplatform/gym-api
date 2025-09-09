import { IdType } from "@/shared/types/IdType";
import { IDefaultEntityProperties } from "../../shared/interfaces/IDefaulEntityProperties";

export interface IGroup extends IDefaultEntityProperties {
  name: string; // unique
  academyId: IdType; // point to academy collection
  permissions: {
    drawerMenu: {
      drawer: boolean;
    };
  };
}
