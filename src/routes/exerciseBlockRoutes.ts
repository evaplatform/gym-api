import express from 'express';
import { ExerciseBlockController } from '../controllers/ExerciseBlockController';


const router = express.Router();

router.get('/', ExerciseBlockController.getAll);
router.get('/:id', ExerciseBlockController.getById);
router.post('/', ExerciseBlockController.create);
router.patch('/', ExerciseBlockController.update);
router.delete('/:id', ExerciseBlockController.delete);

export default router;
