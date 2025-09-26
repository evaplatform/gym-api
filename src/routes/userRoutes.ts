import express from 'express';
import { UserController } from '../controllers/UserController';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { IUser } from '@/models/user/IUser';

const router = express.Router();

router.get('/logged-user', asyncRoute<void>(UserController.getLoggedUser))

router.get('/:id', asyncRoute<void>(UserController.getById));
router.delete('/:id', asyncRoute<IUser>(UserController.delete));

router.get('/', asyncRoute<void>(UserController.getAll));
router.post('/', asyncRoute<IUser>(UserController.create));
router.patch('/', asyncRoute<IUser>(UserController.update));

export default router;
