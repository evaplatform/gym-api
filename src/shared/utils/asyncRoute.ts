// src/shared/utils/routeWrapper.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';

/**
 * Creates a wrapper for route handlers that deal with AuthenticatedRequest
 * @param handler Controller function that receives AuthenticatedRequest
 * @returns Express-compatible RequestHandler
 */
export function asyncRoute<T = any>(
  handler: (req: AuthenticatedRequest<T>, res: Response) => Promise<any>
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req as unknown as AuthenticatedRequest<T>, res);
    } catch (error) {
      next(error);
    }
  };
}