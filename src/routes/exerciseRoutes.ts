import express from 'express';
import { ExerciseController } from '../controllers/ExerciseController';
import { IExercise } from '@/models/exercise/IExercise';
import { asyncRoute } from '@/shared/utils/asyncRoute';

const router = express.Router();

// Rotas simplificadas com o wrapper
router.get('/', asyncRoute<IExercise[]>(ExerciseController.getAll));
router.get('/:id', asyncRoute<IExercise>(ExerciseController.getById));
router.post('/', asyncRoute<IExercise>(ExerciseController.create));
router.patch('/', asyncRoute<IExercise>(ExerciseController.update));
router.delete('/:id', asyncRoute<IExercise>(ExerciseController.delete));

export default router;