import express from 'express';
import { GroupController } from '../controllers/GroupController';
import { asyncRoute } from '@/shared/utils/asyncRoute';
import { IGroup } from '@/models/group/IGroup';

const router = express.Router();

router.get('/', asyncRoute<void>(GroupController.getAll));
router.post('/', asyncRoute<IGroup>(GroupController.create));
router.patch('/', asyncRoute<IGroup>(GroupController.update));

router.get('/:id', asyncRoute<void>(GroupController.getById));
router.delete('/:id', asyncRoute<IGroup>(GroupController.delete));

export default router;
