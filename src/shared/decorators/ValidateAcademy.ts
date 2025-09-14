import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { UserModel } from "@/models/user/mongo-schema";

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


        if (req.body && req.body.userId) {
            const targetUser = await UserModel.findOne({ _id: req.body.userId }).exec();

            if (!targetUser) {
                throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
            }

            if (targetUser.academyId.toString() !== req.user.academyId) {
                throw new AppError('Cannot operate on a user from a different academy', HttpStatusCodeEnum.FORBIDDEN);
            }
        }

        if (req.params && req.params.userId) {
            const targetUser = await UserModel.findOne({ _id: req.params.userId }).exec();

            if (!targetUser) {
                throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
            }

            if (targetUser.academyId.toString() !== req.user.academyId) {
                throw new AppError('Cannot access a user from a different academy', HttpStatusCodeEnum.FORBIDDEN);
            }
        }

        req.validatedAcademyId = req.user.academyId;

        return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
}