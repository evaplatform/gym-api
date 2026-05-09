import { IdType } from '@/shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaultEntityProperties';
import { IAppColors, IThemeColors } from '@/interfaces/IAppColors';

export interface ISettings extends IDefaultEntityProperties {
  academyId: IdType;
  themeColors: IAppColors;
  homeBackgroundImagePath: string;
}
