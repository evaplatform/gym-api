export interface AuthenticatedRequest<T = unknown> extends Request {
  user?: {
    id: string;
    academyId: string | null;
    isAdmin: boolean;
  };
  headers: Headers & {
    authorization?: string;
    "x-refresh-token"?: string;
  };
  requestBody: T; // Renamed to avoid conflict with the Request interface
  params: { [key: string]: string };
}
