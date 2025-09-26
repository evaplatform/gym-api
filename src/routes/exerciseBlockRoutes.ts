import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { IExerciseBlock } from '@/models/exerciseBlock/IExerciseBlock';
import { ExerciseBlockController } from '@/controllers/ExerciseBlockController';

const router = express.Router();

router.post('/all-by-user-workouts/', asyncRoute<void>(ExerciseBlockController.getAllByUserWorkouts));

router.get('/:id', asyncRoute<void>(ExerciseBlockController.getById));
router.delete('/:id', asyncRoute<IExerciseBlock>(ExerciseBlockController.delete));

router.get('/', asyncRoute<void>(ExerciseBlockController.getAll));
router.post('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.create));
router.patch('/', asyncRoute<IExerciseBlock>(ExerciseBlockController.update));

export default router;