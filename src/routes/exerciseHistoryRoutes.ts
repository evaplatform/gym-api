import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { ExerciseHistoryController } from '@/controllers/ExerciseHistoryController';
import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';

const router = express.Router();

router.get('/', asyncRoute<void>(ExerciseHistoryController.getAll));
router.post('/', asyncRoute<IExerciseHistory>(ExerciseHistoryController.create));
router.patch('/', asyncRoute<IExerciseHistory>(ExerciseHistoryController.update));
router.get('/:userId/all-by-user', asyncRoute<void>(ExerciseHistoryController.getAllByUser));

router.get('/:id', asyncRoute<void>(ExerciseHistoryController.getById));
router.delete('/:id', asyncRoute<IExerciseHistory>(ExerciseHistoryController.delete));

export default router;