import { Request, Response, NextFunction } from 'express';

export function CatchErrors(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(originalMethod.call(this, req, res, next)).catch((err) => {
       next(err) 
      });
  };

  return descriptor;
}
// Usage in a controller method
