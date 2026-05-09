import mongoose from 'mongoose';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { ISettings } from './ISettings';

const NotificationColorsSchema = new mongoose.Schema(
  {
    danger: { type: String, required: true },
    warn: { type: String, required: true },
    success: { type: String, required: true },
    info: { type: String, required: true },
  },
  { _id: false }
);

const ThemeColorsSchema = new mongoose.Schema(
  {
    border: { type: String, required: true },
    black: { type: String, required: true },
    white: { type: String, required: true },
    text: { type: String, required: true },
    background: { type: String, required: true },
    backgroundSecondary: { type: String, required: true },
    backgroundSelected: { type: String, required: true },
    tint: { type: String, required: true },
    selectedOptions: { type: String, required: true },
    icon: { type: String, required: true },
    tabIconDefault: { type: String, required: true },
    tabIconSelected: { type: String, required: true },
    gray100: { type: String, required: true },
    gray200: { type: String, required: true },
    gray300: { type: String, required: true },
    gray400: { type: String, required: true },
    gray500: { type: String, required: true },
    gray600: { type: String, required: true },
    gray700: { type: String, required: true },
    gray800: { type: String, required: true },
    gray900: { type: String, required: true },
    notification: { type: NotificationColorsSchema, required: true },
    secondary: { type: String, required: true },
    shadow: { type: String, required: true },
  },
  { _id: false }
);

const AppColorsSchema = new mongoose.Schema(
  {
    light: { type: ThemeColorsSchema, required: true },
    dark: { type: ThemeColorsSchema, required: true },
  },
  { _id: false }
);

const SettingsSchema = new mongoose.Schema<ISettings>(
  {
    academyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Academy' },
    themeColors: { type: AppColorsSchema, required: true },
    homeBackgroundImagePath: { type: String, required: true, maxlength: 300 },
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const SettingsModel = mongoose.model<ISettings>('Settings', SettingsSchema);
