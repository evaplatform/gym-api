import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { SettingsServiceImpl } from '@/services/settings/SettingsServiceImpl';
import { SettingsRepositoryImpl } from '@/repositories/settings/SettingsRepositoryImpl';
import { ISettings } from '@/models/settings/ISettings';


const settingsService = new SettingsServiceImpl(new SettingsRepositoryImpl());

export class SettingsController {
  @CatchErrors
  @Authenticate
  static async getAll(req: AuthenticatedRequest, res: Response) {
    const settings = await settingsService.getAll(req);
    return res.json(settings);
  }

  @CatchErrors
  @Authenticate
  static async create(req: AuthenticatedRequest<ISettings>, res: Response) {
    const setting = await settingsService.create(req);
    res.status(HttpStatusCodeEnum.CREATED).json(setting);
  }

  @CatchErrors
  @Authenticate
  static async update(req: AuthenticatedRequest<ISettings>, res: Response) {
    const setting = await settingsService.update(req);
    res.status(HttpStatusCodeEnum.OK).json(setting);
  }

  @CatchErrors
  @Authenticate
  static async delete(req: AuthenticatedRequest, res: Response) {
    await settingsService.delete(req);
    res.status(HttpStatusCodeEnum.OK).json({ message: 'setting deleted successfully' });
  }

  @CatchErrors
  @Authenticate
  static async getById(req: AuthenticatedRequest, res: Response) {
    const setting = await settingsService.getById(req);
    res.status(HttpStatusCodeEnum.OK).json(setting);
  }
}
