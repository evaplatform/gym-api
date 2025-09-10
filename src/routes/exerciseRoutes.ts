import express from 'express';
import { ExerciseController } from '../controllers/ExerciseController';
import { IExercise } from '@/models/exercise/IExercise';
import { asyncRoute } from '../shared/utils/asyncRoute';

const router = express.Router();

// Rotas simplificadas com o wrapper
router.get('/', asyncRoute<void>(ExerciseController.getAll));
router.get('/:id', asyncRoute<void>(ExerciseController.getById));
router.post('/', asyncRoute<IExercise>(ExerciseController.create));
router.patch('/', asyncRoute<IExercise>(ExerciseController.update));
router.delete('/:id', asyncRoute<IExercise>(ExerciseController.delete));
router.get('/:userId/all', asyncRoute<void>(ExerciseController.getAllByUserId));

export default router;