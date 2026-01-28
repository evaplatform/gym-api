import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { ITraining } from '@/models/training/ITraining';
import { TrainingController } from '@/controllers/TrainingController';

const router = express.Router();

// Primeiro as rotas específicas
router.get('/', asyncRoute<void>(TrainingController.getAll));
router.post('/', asyncRoute<ITraining>(TrainingController.create));
router.patch('/', asyncRoute<ITraining>(TrainingController.update));
// router.get('/all-by-user/:userId?', asyncRoute<void>(TrainingController.getAllByUser));

// Depois as rotas com parâmetros
router.get('/:id', asyncRoute<void>(TrainingController.getById));
router.delete('/:id', asyncRoute<ITraining>(TrainingController.delete));

export default router;