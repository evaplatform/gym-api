import { TrainingByUserModel } from '@/models/trainingByUser/mongo-schema';

import { IdType } from '../../shared/types/IdType';
import { ISettingsRepository } from './ISettingsRepository';
import { SettingsModel } from '@/models/settings/mongo-schema';
import { ISettings } from '@/models/settings/ISettings';


export class SettingsRepositoryImpl implements ISettingsRepository {
  async update(id: IdType, setting: Partial<ISettings>): Promise<ISettings | null> {
    const updated = await SettingsModel.findByIdAndUpdate(
      id,
      { $set: setting },
      { new: true }
    ).exec();

    return updated ? updated.toJSON() : null;
  }

  async getById(id: IdType, academyId?: IdType): Promise<ISettings | null> {
    const filter = academyId ? { _id: id, academyId } : { _id: id };
    const setting = await SettingsModel.findOne(filter).exec();

    return setting ? setting.toJSON() : null;
  }

  async getAll(academyId?: IdType): Promise<ISettings[]> {
    const filter = academyId ? { academyId } : {};
    const settings = await SettingsModel.find(filter).exec();

    return settings.map((setting) => setting.toJSON());
  }

  async create(setting: ISettings): Promise<ISettings> {
    const created = await SettingsModel.create(setting);
    return created.toJSON();
  }

  async delete(id: IdType): Promise<void | null> {
    await SettingsModel.findByIdAndDelete(id);
  }

  async getAllByUserExercises(userId: IdType, academyId?: IdType): Promise<ISettings[]> {
    const filter: any = { userId };
    if (academyId) {
      filter.academyId = academyId;
    }

    const trainingsByUserList = await TrainingByUserModel.find({ userId }).exec();

    const filterExercise = {
      trainingIds: trainingsByUserList.map((t) => t.trainingId).filter((id) => !!id),
    };

    const exercises: any[] = await SettingsModel.find(filterExercise).exec();

    return exercises.map((setting) => setting.toJSON());
  }

  async getAllByTraining(trainingId: IdType, academyId?: IdType): Promise<ISettings[]> {
    const filter: any = { trainingIds: trainingId };
    if (academyId) {
      filter.academyId = academyId;
    }

    const exercises: any[] = await SettingsModel.find(filter).exec();

    return exercises.map((setting) => setting.toJSON());
  }
}
