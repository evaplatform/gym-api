export const SALT = Number(process.env.MONGODB_USERNAME) || 10;
export const EXPIRATION_TIME = '1m';
export const JWT_ALGORITHM = 'HS256';