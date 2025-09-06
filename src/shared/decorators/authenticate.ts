import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { log } from "../utils/log";

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  userId: string;
  academyId: string | null;
  isAdmin: boolean;
}

export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('No token provided', HttpStatusCodeEnum.UNAUTHORIZED);
      }

      const token = authHeader.split(' ')[1];

      try {
        log('Attempting to verify token with secret length:', JWT_SECRET?.length);

        if (!JWT_SECRET) {
          console.error('JWT_SECRET is not defined in environment variables');
          throw new AppError('Server authentication configuration error', HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
        }

        const decoded = jwt.verify(
          token,
          JWT_SECRET,
          { algorithms: ['HS256'] }
        ) as JwtPayload;

        log('Token successfully verified');

        // Adicionar informações do usuário à requisição
        req.user = {
          id: decoded.userId,
          academyId: decoded.academyId,
          isAdmin: decoded.isAdmin
        };

        log('Authenticated user:', req.user);

        // Chamar o método original com o mesmo contexto e argumentos
        return originalMethod.apply(this, arguments);
      } catch (error: any) {
        throw new AppError(error.message, HttpStatusCodeEnum.UNAUTHORIZED);
      }
    } catch (error: any) {
      log('JWT verification error:', error.message, error.name);
      if (next) {
        next(error);
      } else {
        // Se não tiver next, tratar o erro aqui
        console.error('Authentication error:', error);
        res.status(401).json({
          error: 'Authentication failed',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };

  return descriptor;
}


