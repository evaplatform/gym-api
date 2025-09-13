import express from 'express';
import { ExerciseByUserController } from '../controllers/ExerciseByUserController';
import { IExerciseByUser } from '@/models/bodyBuildingByUser/IExerciseByUser';
import { asyncRoute } from '../shared/utils/asyncRoute';

const router = express.Router();

router.get('/', asyncRoute<void>(ExerciseByUserController.getAll));
router.get('/:id', asyncRoute<void>(ExerciseByUserController.getById));
router.post('/', asyncRoute<IExerciseByUser>(ExerciseByUserController.create));
router.patch('/', asyncRoute<IExerciseByUser>(ExerciseByUserController.update));
router.delete('/:id', asyncRoute<IExerciseByUser>(ExerciseByUserController.delete));
router.get('/user/:userId/exercise/:exerciseId', asyncRoute<void>(ExerciseByUserController.getByUserAndExerciseId));
router.get('/user/:userId', asyncRoute<void>(ExerciseByUserController.getByUserId));

export default router;