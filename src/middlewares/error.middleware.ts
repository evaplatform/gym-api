import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';

export function errorHandler(
  err: Error & { keyValue: Record<string, string>; code: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Erro de duplicidade MongoDB (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(HttpStatusCodeEnum.CONFLICT).json({
      error: `Valor duplicado: '${value}' já existe para o campo '${field}'`,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);

  return res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
  });
}
