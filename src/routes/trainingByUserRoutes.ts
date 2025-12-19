import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { TrainingByUserController } from '@/controllers/TrainingByUserController';
import { ITrainingByUser } from '@/models/trainingByUser/ITrainingByUser';

const router = express.Router();

router.get('/:id', asyncRoute<void>(TrainingByUserController.getById));
router.delete('/:id', asyncRoute<ITrainingByUser>(TrainingByUserController.delete));

router.get('/', asyncRoute<void>(TrainingByUserController.getAll));
router.post('/', asyncRoute<ITrainingByUser>(TrainingByUserController.create));
router.patch('/:id', asyncRoute<ITrainingByUser>(TrainingByUserController.update));

export default router;