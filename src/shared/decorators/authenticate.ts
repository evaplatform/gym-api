import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";
import { Request } from "express";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);


export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  // This decorator does nothing, so it won't affect the behavior of the method.
}

// export function Authenticate(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): void {
//   const originalMethod = descriptor.value;

//   descriptor.value = async function (request: Request, ...args: any[]) {
//     let token = request.headers?.authorization?.split(" ")[1];
//     const refreshToken = request.headers?.["x-refresh-token"] as string;

//     if (!token) {
//       throw new AppError("Token de acesso ausente", HttpStatusCodeEnum.UNAUTHORIZED);
//     }

//     try {
//       // 1. Valida o accessToken com jose
//       const { payload } = await jose.jwtVerify(token, JWT_SECRET_KEY);

//       // 2. Se passou, define usuário no request
//       (request as any).user = payload;
//     } catch (err: any) {
//       if (!refreshToken) {
//         throw new AppError("Token inválido e sem refreshToken", HttpStatusCodeEnum.UNAUTHORIZED);
//       }

//       try {
//         // 3. Valida o refreshToken com jose
//         const { payload } = await jose.jwtVerify(refreshToken, JWT_SECRET_KEY);

//         if (payload.type !== "refresh") {
//           throw new AppError("Token de refresh inválido", HttpStatusCodeEnum.UNAUTHORIZED);
//         }

//         // 4. Emite novo accessToken
//         const newAccessToken = await new jose.SignJWT({
//           name: payload.name,
//           email: payload.email,
//           picture: payload.picture,
//           given_name: payload.given_name,
//           family_name: payload.family_name,
//           email_verified: payload.email_verified,
//         })
//           .setProtectedHeader({ alg: "HS256" })
//           .setExpirationTime("15m")
//           .setSubject(payload.sub as string)
//           .setIssuedAt()
//           .sign(JWT_SECRET_KEY);

//         // Substitui o token antigo
//         token = newAccessToken;

//         // Define usuário no request
//         (request as any).user = jose.decodeJwt(newAccessToken);
//       } catch (refreshErr) {
//         console.error("Erro ao validar refreshToken:", refreshErr);
//         throw new AppError("Falha ao renovar o token", HttpStatusCodeEnum.UNAUTHORIZED);
//       }
//     }

//     return originalMethod.apply(this, [request, ...args]);
//   };
// }




// import jwt from 'jsonwebtoken';
// import { AppError } from '../../errors/AppError';
// import { HttpStatusCodeEnum } from '../enums/HttpStatusCodeEnum';
// import { Request } from 'express';
// import axios from 'axios';
// import qs from 'qs';

// export function Authenticate(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): void {
//   const originalMethod = descriptor.value;

//   descriptor.value = async function (request: Request, ...args: any[]) {
//     let token = request.headers?.authorization?.split(' ')[1];
//     const refreshToken = request.headers?.['x-refresh-token'];

//     if (!token) {
//       throw new AppError('User is unauthorized to access', HttpStatusCodeEnum.UNAUTHORIZED);
//     }

//     try {
//       // tenta validar com o token atual
//       const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       (request as any).user = response.data;
//     } catch (err) {
//       // se o token expirar, tenta renovar com o refresh token
//       if (refreshToken) {
//         try {
//           const tokenResponse = await axios.post(
//             'https://oauth2.googleapis.com/token',
//             qs.stringify({
//               client_id: process.env.GOOGLE_CLIENT_ID,
//               client_secret: process.env.GOOGLE_CLIENT_SECRET,
//               refresh_token: refreshToken,
//               grant_type: 'refresh_token',
//             }),
//             {
//               headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//             }
//           );

//           token = tokenResponse.data.access_token;

//           // tenta de novo com novo access_token
//           const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           (request as any).user = userInfo.data;
//         } catch (refreshErr) {
//           throw new AppError('Failed to refresh Google token', HttpStatusCodeEnum.UNAUTHORIZED);
//         }
//       } else {
//         throw new AppError('Invalid Google access token', HttpStatusCodeEnum.UNAUTHORIZED);
//       }
//     }

//     return originalMethod.apply(this, [request, ...args]);
//   };
// }
