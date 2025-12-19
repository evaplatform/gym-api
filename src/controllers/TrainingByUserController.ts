import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { TrainingByUserRepositoryImpl } from '../repositories/trainingByUser/TrainingByUserRepositoryImpl';
import { TrainingByUserServiceImpl } from '../services/trainingByUser/TrainingByUserServiceImpl';
import { ITrainingByUser } from '@/models/trainingByUser/ITrainingByUser';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';

const TrainingByUserService = new TrainingByUserServiceImpl(new TrainingByUserRepositoryImpl());

export class TrainingByUserController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const trainingList = await TrainingByUserService.getAll(req);
        res.json(trainingList);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<ITrainingByUser>, res: Response) {
        const training = await TrainingByUserService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(training);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<ITrainingByUser>, res: Response) {
        const training = await TrainingByUserService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(training);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await TrainingByUserService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Training by user deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const training = await TrainingByUserService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(training);
    }


    @CatchErrors
    @Authenticate
    static async getByUserId(req: AuthenticatedRequest, res: Response) {
        const userId = req.params.userId;
        const trainingList = await TrainingByUserService.getAll(req);
        const userTrainings = trainingList.filter(training => training.userId.toString() === userId);
        res.status(HttpStatusCodeEnum.OK).json(userTrainings);
    }
}
