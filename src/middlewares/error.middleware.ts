// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { i18n } from '@/i18n';
import { getFieldDisplayName, translateMongooseError } from '@/shared/utils/mongooseErrorTranslator';
import { ErrorCode } from '@/errors/ErrorMessages';
import { SupportedLanguagesEnum } from '@/shared/enums/LanguagesEnum';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('🔥 Error handler caught:', err);

  const language = req.headers['accept-language']?.includes(SupportedLanguagesEnum.PT_BR) ? SupportedLanguagesEnum.PT_BR : SupportedLanguagesEnum.EN;
  i18n.setLanguage(language as SupportedLanguagesEnum);

  // 1. AppError customizado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      error: err.message,
      code: err.statusCode,
      message: err.message
    });
  }

  // 2. Duplicidade MongoDB
  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue)[0];
    const fieldDisplayName = getFieldDisplayName(field);
    const value = err.keyValue[field];

    const translatedMessage = i18n.translate(ErrorCode.VALIDATION_UNIQUE)
      .replace('{field}', fieldDisplayName);

    return res.status(HttpStatusCodeEnum.CONFLICT).json({
      status: 'error',
      error: translatedMessage,
      code: HttpStatusCodeEnum.CONFLICT,
      message: translatedMessage
    });
  }


  // 3. ValidationError do Mongoose
  if (err.name === 'ValidationError' && err.errors.description.kind === "maxlength") {
    const fieldDisplayName = getFieldDisplayName('description');
    const translatedMessage = i18n.translate(ErrorCode.VALIDATION_MAX_LENGTH)
      .replace('{field}', fieldDisplayName)
      .replace('{max}', err.errors.description.properties.maxlength);

    return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
      status: 'error',
      code: HttpStatusCodeEnum.BAD_REQUEST,
      error: translatedMessage,
      message: translatedMessage,
    });
  }


  if (err.name === 'ValidationError') {
    const details: Record<string, string> = {};

    // Traduzir cada erro de validação individual
    Object.keys(err.errors).forEach(key => {
      const errorMsg = err.errors[key].message;
      const fieldDisplayName = getFieldDisplayName(key);

      const { message } = translateMongooseError(errorMsg, fieldDisplayName);
      details[key] = message;
    });


    // 4. CastError do Mongoose (ObjectId inválido, por ex.)
    if (err.name === 'CastError') {
      const fieldDisplayName = getFieldDisplayName(err.path);

      const translatedMessage = i18n.translate(ErrorCode.VALIDATION_TYPE)
        .replace('{field}', fieldDisplayName)
        .replace('{type}', err.kind)
        .replace('{value}', err.value);

      return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
        status: 'error',
        code: HttpStatusCodeEnum.BAD_REQUEST,
        error: translatedMessage,
        message: translatedMessage,
      });
    }



    // 5. Mensagem geral de erro de validação
    const generalMessage = i18n.translate(ErrorCode.VALIDATION_ERROR);

    return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
      status: 'error',
      code: HttpStatusCodeEnum.BAD_REQUEST,
      error: generalMessage,
      message: generalMessage,
      details,
    });
  }

  // 6. Fallback: erro inesperado
  const genericErrorMessage = i18n.translate(ErrorCode.GENERIC_ERROR);

  return res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    error: genericErrorMessage,
    message: genericErrorMessage,
    // Em ambiente de desenvolvimento, incluir detalhes adicionais
    ...(process.env.NODE_ENV === 'development' && {
      details: err.message,
      stack: err.stack
    })
  });

}
