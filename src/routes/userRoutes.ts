import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
