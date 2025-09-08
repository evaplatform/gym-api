import express from 'express';
import { BodyBuildingByUserController } from '../controllers/BodyBuildingByUserController';
import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';


const router = express.Router();


router.get('/', (req, res, next) => {
    BodyBuildingByUserController.getAll(req as unknown as AuthenticatedRequest<IBodyBuildingByUser[]>, res).catch(next);
});
router.get('/:id', (req, res, next) => BodyBuildingByUserController.getById(req as unknown as AuthenticatedRequest<IBodyBuildingByUser>, res).catch(next));
router.post('/', (req, res, next) => BodyBuildingByUserController.create(req as unknown as AuthenticatedRequest<IBodyBuildingByUser>, res).catch(next));
router.patch('/', (req, res, next) => BodyBuildingByUserController.update(req as unknown as AuthenticatedRequest<IBodyBuildingByUser>, res).catch(next));
router.delete('/:id', (req, res, next) => BodyBuildingByUserController.delete(req as unknown as AuthenticatedRequest<IBodyBuildingByUser>, res).catch(next));

export default router;
