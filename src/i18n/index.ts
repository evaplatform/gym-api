// src/i18n/index.ts
import { errorMessages as enErrorMessages } from './translations/en';
import { errorMessages as ptErrorMessages } from './translations/pt';
import { ErrorCode } from '../errors/ErrorMessages';
import { SupportedLanguagesEnum } from '@/shared/enums/LanguagesEnum';



const translations: Record<SupportedLanguagesEnum, Record<ErrorCode, string>> = {
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

  translate(code: ErrorCode): string {
    return translations[currentLanguage][code] || translations['en'][code];
  }
}