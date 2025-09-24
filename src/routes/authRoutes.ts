import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { asyncRoute } from '@/shared/utils/asyncRoute';
import { IRefreshToken } from '@/shared/interfaces/IRefreshToken';

const router = express.Router();

router.post('/signin-create', AuthController.signinOurCreate);
router.post('/signout', (req, res, next) => AuthController.signout(req as unknown as AuthenticatedRequest, res).catch(next));
router.post('/test-token', asyncRoute(AuthController.generateTestToken));
router.patch('/refresh-token', asyncRoute(AuthController.refreshToken));

export default router;
