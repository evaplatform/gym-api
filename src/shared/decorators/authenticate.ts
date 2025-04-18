import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../enums/HttpStatusCodeEnum';
import { Request } from 'express';
import axios from 'axios';

export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (request: Request, ...args: any[]) {
    const token = request.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('user is unauthorized to access', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    try {
      // validate the token
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;

      // // Anexa o user à request caso queira usar nos métodos protegidos
      // request.user = {
      //   email: userData.email,
      //   name: userData.name,
      //   picture: userData.picture,
      //   sub: userData.sub, // ID único do Google
      // };

    } catch (err) {
      throw new AppError('Invalid Google access token', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    return originalMethod.apply(this, [request, ...args]);
  };
}


// export function Authenticate(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): void {
//   const originalMethod = descriptor.value;

//   descriptor.value = async function (request: Request, ...args: any[]) {
//     const token = request.headers?.authorization?.split(' ')[1];

//     if (!token) {
//       throw new AppError('user is unauthorized to access', HttpStatusCodeEnum.UNAUTHORIZED);
//     }

//     let decodedToken;
//     try {
//       const jwtSecret = process.env.JWT_SECRET;
//       if (!jwtSecret) {
//         throw new AppError('JWT secret is not defined', HttpStatusCodeEnum.UNAUTHORIZED);
//       }
//       decodedToken = jwt.verify(token, jwtSecret);
//     } catch (err) {
//       throw new AppError('Invalid token', HttpStatusCodeEnum.UNAUTHORIZED);
//     }

//     return originalMethod.apply(this, [request, ...args]);
//   };
// }
