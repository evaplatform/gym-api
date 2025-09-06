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
      
      // Decodificar o token sem verificar
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const headerB64 = parts[0];
          const headerStr = Buffer.from(headerB64, 'base64').toString();
          const header = JSON.parse(headerStr);
          log('Token header:', header);
          
          // Se o algoritmo não for HS256, temos um problema
          if (header.alg !== 'HS256') {
            log('WARNING: Token algorithm is not HS256, but:', header.alg);
          }
          
          const payloadB64 = parts[1];
          const payloadStr = Buffer.from(payloadB64, 'base64').toString();
          const payload = JSON.parse(payloadStr);
          log('Token payload (partial):', {
            // Mostrar apenas campos não sensíveis
            iat: payload.iat,
            exp: payload.exp,
            userId: payload.userId,
            // Não mostrar valores completos
            hasUserId: !!payload.userId,
            hasAcademyId: !!payload.academyId,
            isAdmin: payload.isAdmin
          });
        }
      } catch (e) {
        log('Error decoding token:', e);
      }

      // Verificar o JWT_SECRET
      if (!JWT_SECRET) {
        log('JWT_SECRET is not defined');
        throw new AppError('Server authentication configuration error', HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
      }
      
      log('JWT_SECRET first 5 chars:', JWT_SECRET.substring(0, 5) + '...');
      log('JWT_SECRET length:', JWT_SECRET.length);

      try {
        // Verificar o token
        log('Attempting to verify token...');
        const decoded = jwt.verify(
          token,
          JWT_SECRET,
          { algorithms: ['HS256'] }
        ) as JwtPayload;

        log('Token successfully verified!');
        
        // Adicionar informações do usuário à requisição
        req.user = {
          id: decoded.userId,
          academyId: decoded.academyId,
          isAdmin: decoded.isAdmin
        };

        // Chamar o método original
        return originalMethod.apply(this, arguments);
      } catch (error: any) {
        log('JWT verification error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack?.split('\n')[0]
        });
        throw new AppError(error.message, HttpStatusCodeEnum.UNAUTHORIZED);
      }
    } catch (error: any) {
      if (next) {
        next(error);
      } else {
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