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

export default router;