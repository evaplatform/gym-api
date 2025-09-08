import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';

const router = express.Router();

router.post('/signin-create', AuthController.signinOurCreate);
router.post('/signout', (req, res, next) => AuthController.signout(req as unknown as AuthenticatedRequest, res).catch(next));
router.post('/test-token', AuthController.generateTestToken);

export default router;
