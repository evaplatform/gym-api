// src/shared/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        academyId: string | null;
        isAdmin: boolean;
      };
    }
  }
}