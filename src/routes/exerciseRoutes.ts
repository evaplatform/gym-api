import express from 'express';
import { ExerciseController } from '../controllers/ExerciseController';
import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest';
import { IExercise } from 'exercise/IExercise';


const router = express.Router();


router.get('/', (req, res, next) => {
    ExerciseController.getAll(req as unknown as AuthenticatedRequest<IExercise[]>, res).catch(next);
});
router.get('/:id', (req, res, next) => ExerciseController.getById(req as unknown as AuthenticatedRequest<IExercise>, res).catch(next));
router.post('/', (req, res, next) => ExerciseController.create(req as unknown as AuthenticatedRequest<IExercise>, res).catch(next));
router.patch('/', (req, res, next) => ExerciseController.update(req as unknown as AuthenticatedRequest<IExercise>, res).catch(next));
router.delete('/:id', (req, res, next) => ExerciseController.delete(req as unknown as AuthenticatedRequest<IExercise>, res).catch(next));

export default router;
