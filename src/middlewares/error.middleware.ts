// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('🔥 Error handler caught:', err);

  // 1. AppError customizado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // 2. Duplicidade MongoDB
  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res.status(HttpStatusCodeEnum.CONFLICT).json({
      error: `Valor duplicado: '${value}' já existe para o campo '${field}'`,
    });
  }

  // 3. ValidationError do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
      error: err.message,
      details: Object.keys(err.errors).reduce((acc: any, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {}),
    });
  }

  // 4. CastError do Mongoose (ObjectId inválido, por ex.)
  if (err.name === 'CastError') {
    return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
      error: `Valor inválido para o campo '${err.path}': '${err.value}'`,
    });
  }

  // 5. Fallback: erro inesperado
  return res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
  });
}
