import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { ValidateAcademy } from '../../shared/decorators/ValidateAcademy';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ISettingsService } from './ISettingsService';
import { ISettings } from '@/models/settings/ISettings';
import { ISettingsRepository } from '@/repositories/settings/ISettingsRepository';

export class SettingsServiceImpl implements ISettingsService {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<ISettings[]> {
    if (req.user?.isAdmin) {
      return this.settingsRepository.getAll();
    }

    return this.settingsRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<ISettings | null> {
    const id = req.params.id;
    let settings: ISettings | null = null;

    if (req.user?.isAdmin) {
      settings = await this.settingsRepository.getById(id);
    } else {
      settings = await this.settingsRepository.getById(id, req.validatedAcademyId);
    }

    if (!settings) {
      throw new AppError('Settings not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return settings;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<ISettings>): Promise<ISettings> {
    const settings = req.body;

    return this.settingsRepository.create(settings);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<ISettings>): Promise<ISettings | null> {
    const settings = req.body;

    return this.settingsRepository.update(settings.id, settings);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.settingsRepository.delete(id);
  }
}
