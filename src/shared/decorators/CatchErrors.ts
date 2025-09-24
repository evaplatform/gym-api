import { Request, Response, NextFunction } from 'express';

export function CatchErrors(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const next = args[2]; // express sempre passa next como 3º arg se existir
    return Promise.resolve(originalMethod.apply(this, args)).catch((err) => {
      if (typeof next === "function") {
        next(err);
      } else {
        console.error("Unhandled error (no next):", err);
        throw err;
      }
    });
  };

  return descriptor;
}
