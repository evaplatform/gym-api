import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { IExerciseBlock } from '@/models/exerciseBlock/IExerciseBlock';
import { ExerciseBlockController } from '@/controllers/ExerciseBlockController';

const router = express.Router();

router.get('/', asyncRoute<void>(ExerciseBlockController.getAll));//
router.get('/:id', asyncRoute<void>(ExerciseBlockController.getById));
router.post('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.create));
router.patch('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.update));
router.delete('/:id', asyncRoute<IExerciseBlock>(ExerciseBlockController.delete));

export default router;