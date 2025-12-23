import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { TrainingByUserController } from '@/controllers/TrainingByUserController';
import { ITrainingByUser } from '@/models/trainingByUser/ITrainingByUser';

const router = express.Router();



router.get('/', asyncRoute<void>(TrainingByUserController.getAll));
router.post('/', asyncRoute<ITrainingByUser>(TrainingByUserController.create));
router.get('/get-by-user/:userId', asyncRoute<void>(TrainingByUserController.getByUserId));

router.get('/:id', asyncRoute<void>(TrainingByUserController.getById));
router.patch('/:id', asyncRoute<ITrainingByUser>(TrainingByUserController.update));
router.delete('/:id', asyncRoute<ITrainingByUser>(TrainingByUserController.delete));


export default router;