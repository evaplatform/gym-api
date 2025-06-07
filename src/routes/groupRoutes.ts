import express from 'express';
import { GroupController } from '../controllers/GroupController';

const router = express.Router();

router.get('/:id', GroupController.getById);
router.post('/', GroupController.create);

export default router;
