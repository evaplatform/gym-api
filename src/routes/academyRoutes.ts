import express from 'express';
import { AcademyController } from '../controllers/AcademyController';

const router = express.Router();

router.get('/', AcademyController.getAll);
router.post('/', AcademyController.create);
router.patch('/', AcademyController.update);
router.delete('/:id', AcademyController.delete);
// router.get('/has-academy/:name', AcademyController.hasAcademy);

export default router;
