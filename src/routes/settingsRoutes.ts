import express from 'express';
import { asyncRoute } from '../shared/utils/asyncRoute';
import { ISettings } from '@/models/settings/ISettings';
import { SettingsController } from '@/controllers/SettingsController';

const router = express.Router();

router.get('/', asyncRoute<void>(SettingsController.getAll));
router.post('/', asyncRoute<ISettings>(SettingsController.create));
router.patch('/', asyncRoute<ISettings>(SettingsController.update));

router.get('/:id', asyncRoute<void>(SettingsController.getById));
router.delete('/:id', asyncRoute<ISettings>(SettingsController.delete));


export default router;