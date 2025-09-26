import express from 'express';
import { AcademyController } from '../controllers/AcademyController';

const router = express.Router();

router.get('/has-academy/:name', AcademyController.hasAcademy);

router.get('/:id', AcademyController.getById);
router.delete('/:id', AcademyController.delete);

router.get('/', AcademyController.getAll);
router.post('/', AcademyController.create);
router.patch('/', AcademyController.update);

export default router;
