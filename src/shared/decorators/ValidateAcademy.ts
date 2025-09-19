import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { i18n } from "@/i18n";
import { GeneralMessages } from "@/errors/GeneralMessages";

export function ValidateAcademy(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: AuthenticatedRequest<any>, ...args: any[]) {
        // Verificar se o usuário tem academyId
        if (!req.user || !req.user.academyId) {
            throw new AppError(i18n.translate(GeneralMessages.ACADEMY_NOT_ASSOCIATED), HttpStatusCodeEnum.FORBIDDEN);
        }

        // Verificar academyId no body
        if (req.body && req.body.academyId &&
            req.user.academyId !== req.body.academyId.toString()) {
            throw new AppError(i18n.translate(GeneralMessages.ACADEMY_ACCESS_DENIED), HttpStatusCodeEnum.FORBIDDEN);
        }

        // Verificar academyId nos parâmetros da URL
        if (req.params && req.params.academyId &&
            req.user.academyId !== req.params.academyId) {
            throw new AppError(i18n.translate(GeneralMessages.ACADEMY_ACCESS_DENIED), HttpStatusCodeEnum.FORBIDDEN);
        }


        req.validatedAcademyId = req.user.academyId;

        return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
}