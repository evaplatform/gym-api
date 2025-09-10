
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { AppError } from '../../errors/AppError';
import { IBodyBuildingByUser } from '../../models/bodyBuildingByUser/IBodyBuildingByUser';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IBodyBuildingByUserService } from './IBodyBuildingByUserService';
import { IBodyBuildingByUserRepository } from 'src/repositories/bodyBuildingByUser/IBodyBuildingByUserRepository';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { IBodyBuildingPlanByUser } from '@/shared/interfaces/IBodyBuildingPlanByUser';
import { isObjectEmpty } from '@/shared/utils/isObjectEmpty';


export class BodyBuildingByUserServiceImpl implements IBodyBuildingByUserService {
  constructor(private readonly bodyBuildingByUserRepository: IBodyBuildingByUserRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IBodyBuildingByUser[]> {
    if (req.user?.isAdmin) {
      return this.bodyBuildingByUserRepository.getAll();
    }
    return this.bodyBuildingByUserRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.create(bodyBuildingByUser);
  }

  async update(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.update(bodyBuildingByUser.id, bodyBuildingByUser);
  }


  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null> {
    const id = req.params.id;
    let bodyBuildingByUser: IBodyBuildingByUser | null = null;

    if (req.user?.isAdmin) {
      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id);
    } else {
      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id, req.validatedAcademyId);
    }

    if (!bodyBuildingByUser) {
      throw new AppError('bodybuilding by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return bodyBuildingByUser;
  }

  @ValidateAcademy
  async getByUserId(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null> {
    const userId = req.params.userId;

    return this.bodyBuildingByUserRepository.getByUserId(userId, req.validatedAcademyId);
  }

  @ValidateAcademy
  async getByUserAndExerciseId(req: AuthenticatedRequest): Promise<IBodyBuildingPlanByUser | null> {
    const userId = req.params.userId;
    const exerciseId = req.params.exerciseId;

    let bodyBuildingPlanByUser: IBodyBuildingPlanByUser | null = null;

    if (req.user?.isAdmin) {
      bodyBuildingPlanByUser = await this.bodyBuildingByUserRepository.getByUserAndExerciseId(userId, exerciseId);
    } else {
      bodyBuildingPlanByUser = await this.bodyBuildingByUserRepository.getByUserAndExerciseId(userId, exerciseId, req.validatedAcademyId);
    }

    if (!bodyBuildingPlanByUser) {
      throw new AppError('plan by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return bodyBuildingPlanByUser;
  }


  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.bodyBuildingByUserRepository.delete(id);
  }

  @ValidateAcademy
  async addPlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser> {
    const plan = req.body as IBodyBuildingPlanByUser;
    const userId = req.params.userId;

    if (!userId || isObjectEmpty(plan) || !plan.exerciseId) {
      throw new AppError('Invalid input data', HttpStatusCodeEnum.BAD_REQUEST);
    }

    return this.bodyBuildingByUserRepository.addPlan(userId, plan, req.validatedAcademyId);
  }

  @ValidateAcademy
  async updatePlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser> {
    const plan = req.body as IBodyBuildingPlanByUser;
    const userId = req.params.userId;

    if (!userId || isObjectEmpty(plan) || !plan.exerciseId) {
      throw new AppError('Invalid input data', HttpStatusCodeEnum.BAD_REQUEST);
    }

    const existingRecord = await this.bodyBuildingByUserRepository.getByUserId(userId, req.validatedAcademyId);

    if (!existingRecord) {
      throw new AppError('BodyBuilding plan for this user does not exist', HttpStatusCodeEnum.NOT_FOUND);
    }

    const planIndex = existingRecord.plan.findIndex(p => p.exerciseId.toString() === plan.exerciseId.toString());
    if (planIndex === -1) {
      throw new AppError('The specified plan was not found for this user', HttpStatusCodeEnum.NOT_FOUND);
    }

    existingRecord.plan[planIndex] = plan;

    return this.bodyBuildingByUserRepository.update(existingRecord.id, existingRecord) as Promise<IBodyBuildingByUser>;
  }

  @ValidateAcademy
  async removePlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser> {
    const exerciseId = req.params.exerciseId;
    const userId = req.params.userId;

    if (!exerciseId) {
      throw new AppError('Invalid input data, missing exercise ID', HttpStatusCodeEnum.BAD_REQUEST);
    }

    if (!userId) {
      throw new AppError('Invalid input data, missing user ID', HttpStatusCodeEnum.BAD_REQUEST);
    }

    const existingRecord = await this.bodyBuildingByUserRepository.getByUserId(userId, req.validatedAcademyId);

    if (!existingRecord) {
      throw new AppError('BodyBuilding plan for this user does not exist', HttpStatusCodeEnum.NOT_FOUND);
    }

    const updatedPlan = existingRecord.plan.filter(p => p.exerciseId.toString() !== exerciseId.toString());
    if (updatedPlan.length === existingRecord.plan.length) {
      throw new AppError('The specified plan was not found for this user', HttpStatusCodeEnum.NOT_FOUND);
    }

    if (updatedPlan.length === existingRecord.plan.length) {
      throw new AppError('The specified plan was not found for this user', HttpStatusCodeEnum.NOT_FOUND);
    }

    existingRecord.plan = updatedPlan;

    return this.bodyBuildingByUserRepository.update(existingRecord.id, existingRecord) as Promise<IBodyBuildingByUser>;
  }


}
