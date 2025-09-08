import express from 'express';
import { UserController } from '../controllers/UserController';
import { asyncRoute } from '@/shared/utils/asyncRoute';
import { IUser } from '@/models/user/IUser';

const router = express.Router();

router.get('/', asyncRoute<void>(UserController.getAll));
router.get('/:id', asyncRoute<void>(UserController.getById));
router.post('/', asyncRoute<IUser>(UserController.create));
router.patch('/', asyncRoute<IUser>(UserController.update));
router.delete('/:id', asyncRoute<IUser>(UserController.delete));

export default router;
