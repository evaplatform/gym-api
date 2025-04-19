import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../enums/HttpStatusCodeEnum';
import { Request } from 'express';
import axios from 'axios';
import qs from 'qs';

export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (request: Request, ...args: any[]) {
    let token = request.headers?.authorization?.split(' ')[1];
    const refreshToken = request.headers?.['x-refresh-token'];

    if (!token) {
      throw new AppError('User is unauthorized to access', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    try {
      // tenta validar com o token atual
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      (request as any).user = response.data;

    } catch (err) {
      // se o token expirar, tenta renovar com o refresh token
      if (refreshToken) {

        try {

          const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            qs.stringify({
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: refreshToken,
              grant_type: 'refresh_token',
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          token = tokenResponse.data.access_token;

          // tenta de novo com novo access_token
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          (request as any).user = userInfo.data;

        } catch (refreshErr) {
          throw new AppError('Failed to refresh Google token', HttpStatusCodeEnum.UNAUTHORIZED);
        }
      } else {
        throw new AppError('Invalid Google access token', HttpStatusCodeEnum.UNAUTHORIZED);
      }
    }

    return originalMethod.apply(this, [request, ...args]);
  };
}
