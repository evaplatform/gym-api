import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { PaymentInfoServiceImpl } from '../services/paymentInfo/PaymentInfoServiceImpl';
import { PaymentInfoRepositoryImpl } from '../repositories/paymentInfo/PaymentInfoRepository';

const paymentInfoService = new PaymentInfoServiceImpl(new PaymentInfoRepositoryImpl());

export class PaymentInfoController {
    @CatchErrors
    @Authenticate
    static async getAll(req: Request, res: Response) {
        const paymentInfos = await paymentInfoService.getAll();
        res.json(paymentInfos); 
    }

    @CatchErrors
    @Authenticate
    static async create(req: Request, res: Response) {
        const paymentInfo = await paymentInfoService.create(req.body);
        res.status(HttpStatusCodeEnum.CREATED).json(paymentInfo);
    }

    @CatchErrors
    @Authenticate
    static async update(req: Request, res: Response) {
        const paymentInfo = await paymentInfoService.update(req.body);
        res.status(HttpStatusCodeEnum.OK).json(paymentInfo);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: Request, res: Response) {
        await paymentInfoService.delete(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Payment info deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: Request, res: Response) {
        const paymentInfo = await paymentInfoService.getById(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json(paymentInfo);
    }
}
