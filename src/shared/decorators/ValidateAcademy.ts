import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

export function ValidateAcademy(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: AuthenticatedRequest<any>, ...args: any[]) {
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


        req.validatedAcademyId = req.user.academyId;

        return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
}