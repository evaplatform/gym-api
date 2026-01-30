
import { IGroupService } from './IGroupService';
import { IGroupRepository } from '../../repositories/group/IGroupRepository';
import { IGroup } from '../../models/group/IGroup';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { HttpStatusCodeEnum } from '@/shared/enums/HttpStatusCodeEnum';
import { AppError } from '@/errors/AppError';

export class GroupServiceImpl implements IGroupService {
    // Constructor
    constructor(private readonly groupRepository: IGroupRepository) { }

    // Methods

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IGroup[]> {
    if (req.user?.isAdmin) {
      return this.groupRepository.getAll();
    }

    return this.groupRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IGroup | null> {
    const id = req.params.id;
    let group: IGroup | null = null;

    if (req.user?.isAdmin) {
      group = await this.groupRepository.getById(id);
    } else {
      group = await this.groupRepository.getById(id, req.validatedAcademyId);
    }

    if (!group) {
      throw new AppError('Group not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return group;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IGroup>): Promise<IGroup> {
    const group = req.body;

    return this.groupRepository.create(group);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<IGroup>): Promise<IGroup | null> {
    const group = req.body;

    return this.groupRepository.update(group.id, group);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.groupRepository.delete(id);
  }
}