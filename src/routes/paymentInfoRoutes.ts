import express from 'express';
import { PaymentInfoController } from '../controllers/PaymentInfoController';


const router = express.Router();

router.get('/', PaymentInfoController.getAll);
router.get('/:id', PaymentInfoController.getById);
router.post('/', PaymentInfoController.create);
router.patch('/', PaymentInfoController.update);
router.delete('/:id', PaymentInfoController.delete);

export default router;
