import express from 'express';
import { BodyBuildingByUserController } from '../controllers/BodyBuildingByUserController';
import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { asyncRoute } from '../shared/utils/asyncRoute';

const router = express.Router();

router.get('/', asyncRoute<void>(BodyBuildingByUserController.getAll));
router.get('/:id', asyncRoute<void>(BodyBuildingByUserController.getById));
router.post('/', asyncRoute<IBodyBuildingByUser>(BodyBuildingByUserController.create));
router.patch('/', asyncRoute<IBodyBuildingByUser>(BodyBuildingByUserController.update));
router.delete('/:id', asyncRoute<IBodyBuildingByUser>(BodyBuildingByUserController.delete));
router.get('/plan/user/:userId/exercise/:exerciseId', asyncRoute<void>(BodyBuildingByUserController.getByUserAndExerciseId));
router.get('/user/:userId', asyncRoute<void>(BodyBuildingByUserController.getByUserId));
router.post('/add-plan/:userId', asyncRoute<IBodyBuildingByUser>(BodyBuildingByUserController.addPlan));
router.delete('/remove-plan/:userId/:exerciseId', asyncRoute<IBodyBuildingByUser>(BodyBuildingByUserController.removePlan));

export default router;