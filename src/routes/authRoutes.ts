import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.post('/signin', AuthController.signin);
router.post('/signout', AuthController.signout);

export default router;
