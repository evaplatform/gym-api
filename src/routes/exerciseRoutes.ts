import express from 'express';
import { ExerciseController } from '../controllers/ExerciseController';


const router = express.Router();

router.get('/', ExerciseController.getAll);
router.get('/:id', ExerciseController.getById);
router.post('/', ExerciseController.create);
router.patch('/', ExerciseController.update);
router.delete('/:id', ExerciseController.delete);

export default router;
