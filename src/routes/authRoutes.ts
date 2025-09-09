import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { asyncRoute } from '@/shared/utils/asyncRoute';

const router = express.Router();

router.post('/signin-create', AuthController.signinOurCreate);
router.post('/signout', (req, res, next) => AuthController.signout(req as unknown as AuthenticatedRequest, res).catch(next));
router.post('/test-token', asyncRoute(AuthController.generateTestToken));

export default router;
