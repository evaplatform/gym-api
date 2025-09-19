// src/i18n/index.ts
import { enErrorMessages as enErrorMessages } from './translations/en';
import { ptErrorMessages as ptErrorMessages } from './translations/pt';
import { ErrorCode } from '../errors/ErrorMessages';
import { SupportedLanguagesEnum } from '@/shared/enums/LanguagesEnum';
import { GeneralMessages } from '@/errors/GeneralMessages';
import { MessageType } from '@/shared/types/MessageType';

const translations: Record<SupportedLanguagesEnum, MessageType> = {
  en: enErrorMessages,
  'pt-BR': ptErrorMessages,
};

let currentLanguage: SupportedLanguagesEnum = SupportedLanguagesEnum.EN;

export const i18n = {
  setLanguage(lang: SupportedLanguagesEnum) {
    currentLanguage = lang;
  },

  getLanguage(): SupportedLanguagesEnum {
    return currentLanguage;
  },

  translate(code: ErrorCode | GeneralMessages): string {
    return translations[currentLanguage][code] || translations['en'][code];
  }
}