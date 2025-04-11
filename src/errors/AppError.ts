import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatusCodeEnum.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
