import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

export function ValidateAcademy(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: AuthenticatedRequest<any>, ...args: any[]) {
        // Se o usuário é admin, não precisamos validar a academia
        if (req.user?.isAdmin) {
            return originalMethod.apply(this, [req, ...args]);
        }

        // Verificar se o usuário tem academyId
        if (!req.user || !req.user.academyId) {
            throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
        }

        // Verificar academyId no body
        if (req.body && req.body.academyId && 
            req.user.academyId !== req.body.academyId.toString()) {
            throw new AppError('Cannot operate on a different academy', HttpStatusCodeEnum.FORBIDDEN);
        }

        // Verificar academyId nos parâmetros da URL
        if (req.params && req.params.academyId && 
            req.user.academyId !== req.params.academyId) {
            throw new AppError('Cannot access a different academy', HttpStatusCodeEnum.FORBIDDEN);
        }

        // Adicionar academyId validado ao request para uso nos métodos
        req.validatedAcademyId = req.user.academyId;

        // Chamar o método original com os argumentos
        return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
}