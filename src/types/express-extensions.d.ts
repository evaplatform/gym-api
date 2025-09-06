// src/types/express-augmentation.d.ts
import 'express';

declare global {
  namespace Express {
    // Estender a interface Request
    interface Request {
      user?: {
        id: string;
        academyId: string | null;
        isAdmin: boolean;
      };
    }
  }
}