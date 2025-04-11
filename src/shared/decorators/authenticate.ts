import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../enums/HttpStatusCodeEnum';
import { Request } from 'express';

export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (request: Request, ...args: any[]) {
    const token = request.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('Email cannot be updated', HttpStatusCodeEnum.BAD_REQUEST);
    }

    let decodedToken;
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new AppError('JWT secret is not defined', HttpStatusCodeEnum.UNAUTHORIZED);
      }
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      throw new AppError('Invalid token', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    return originalMethod.apply(this, [request, ...args]);
  };
}
