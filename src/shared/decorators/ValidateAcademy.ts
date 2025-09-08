import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";


export function validateAcademy(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: AuthenticatedRequest<any>, res: any, next: any) {
        try {
            // Adicionar academyId ao request para evitar o uso de ! no método original
            if (req.user) {
                // Se o usuário é admin, não precisamos validar a academia
                if (req.user.isAdmin) {
                    await originalMethod.apply(this, [req, res, next]);
                    return;
                }

                // Verificar se o usuário tem academyId
                if (!req.user.academyId) {
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
            } else {
                throw new AppError('Unauthorized', HttpStatusCodeEnum.UNAUTHORIZED);
            }

            await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            next(error);
        }
    }

    return descriptor;
}