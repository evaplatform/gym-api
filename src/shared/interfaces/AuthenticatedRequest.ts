export interface AuthenticatedRequest<T = unknown> extends Omit<Request, 'body'> {
  validatedAcademyId?: string;
  user?: {
    id: string;
    academyId: string | null;
    isAdmin: boolean;
  };
  headers: Headers & {
    authorization?: string;
    "x-refresh-token"?: string;
  };
  body: T; // Redefined to avoid conflict with the Request interface
  params: { [key: string]: string };
}
