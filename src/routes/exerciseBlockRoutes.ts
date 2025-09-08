import express from 'express';
import { asyncRoute } from '@/shared/utils/asyncRoute';
import { IExerciseBlock } from '@/models/exerciseBlock/IExerciseBlock';
import { ExerciseBlockController } from '@/controllers/ExerciseBlockController';

const router = express.Router();

// Rotas simplificadas com o wrapper
router.get('/', asyncRoute<IExerciseBlock[]>(ExerciseBlockController.getAll));
router.get('/:id', asyncRoute<IExerciseBlock>(ExerciseBlockController.getById));
router.post('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.create));
router.patch('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.update));
router.delete('/:id', asyncRoute<IExerciseBlock>(ExerciseBlockController.delete));

export default router;