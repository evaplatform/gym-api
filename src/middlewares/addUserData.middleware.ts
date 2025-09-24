// Crie este middleware em um arquivo separado, por exemplo: middlewares/optionalAuth.ts
import { AuthenticatedRequest } from "@/shared/interfaces/AuthenticatedRequest";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
    userId: string;
    academyId: string | null;
    isAdmin: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export function optionalAuthenticate(req: any, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                // Verificar token e adicionar req.user
                const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
                req.user = {
                    id: decoded.userId,
                    academyId: decoded.academyId,
                    isAdmin: decoded.isAdmin
                };
            } catch (error) {
                // Se o token for inválido, apenas continue sem req.user
                console.log('Invalid token in optional authentication:', error);
            }
        }
        next();
    } catch (error) {
        // Não falhar, apenas continuar sem req.user
        next();
    }
}