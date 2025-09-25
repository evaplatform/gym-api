// Crie este middleware em um arquivo separado, por exemplo: middlewares/optionalAuth.ts
import { AuthenticatedRequest } from "@/shared/interfaces/AuthenticatedRequest";
import { log } from "@/shared/utils/log";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
    userId: string;
    academyId: string | null;
    isAdmin: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export function addUserData(req: any, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                log('Optional authentication token found, verifying...');
                // Verificar token e adicionar req.user
                const decoded = jwt.decode(token) as JwtPayload;
                if (!decoded || !decoded.userId) {
                    log('Invalid token payload in optional authentication');
                    return next();
                }

                req.user = {
                    id: decoded.userId,
                    academyId: decoded.academyId,
                    isAdmin: decoded.isAdmin
                };

                log('Token verified, user data added to request:', req.user);
            } catch (error) {
                // Se o token for inválido, apenas continue sem req.user
                log('Invalid token in optional authentication:', error);
            }
        }
        next();
    } catch (error) {
        // Não falhar, apenas continuar sem req.user
        next();
    }
}