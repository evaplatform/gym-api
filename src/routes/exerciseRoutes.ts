import express from 'express';
import { ExerciseController } from '../controllers/ExerciseController';


const router = express.Router();


router.get('/', (req, res, next) => {
    ExerciseController.getAll(req, res).catch(next);
});
router.get('/:id', ExerciseController.getById);
router.post('/', ExerciseController.create);
router.patch('/', ExerciseController.update);
router.delete('/:id', ExerciseController.delete);

export default router;
