import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IAuthService } from './IAuthService';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { getTokensFromAuthCode } from '../../shared/utils/getTokensFromAuthCode';
import { IGoogleTokens } from '../../shared/interfaces/IGoogleTokens';
import { log } from '../../shared/utils/log';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { refreshGoogleTokens } from '@/shared/utils/refreshGoogleTokens';
import { IRefreshToken } from '@/shared/interfaces/IRefreshToken';

import { IUserService } from '../user/IUserService';
import { EXPIRATION_TIME, JWT_ALGORITHM } from '@/shared/constants';
import { i18n } from '@/i18n';
import { GeneralMessages } from '@/errors/GeneralMessages';
import { IResponseRefreshToken } from './interfaces';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

type SigningRequestType = UserWithToken & { authCode: string };

export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: IUserService
  ) {}

  // The parameter here can be the Google token received from the frontend
  async signinOrCreate(
    user: SigningRequestType
  ): Promise<UserWithToken & { googleTokens?: IGoogleTokens }> {
    log('Starting Google Signin/Signup process');

    // ─── Validate env vars on startup ──────────────────────────────────────────
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const jwtSecret = process.env.JWT_SECRET;

    if (!googleClientId) {
      throw new AppError(
        'GOOGLE_CLIENT_ID is not set in environment variables',
        HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }

    if (!jwtSecret) {
      throw new AppError(
        'JWT_SECRET is not set in environment variables',
        HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }

    // ─── Verify Google token ────────────────────────────────────────────────────
    let googleUserData: TokenPayload | undefined = undefined;

    try {
      const ticket: LoginTicket = await client.verifyIdToken({
        idToken: user.token,
        audience: googleClientId, // ✅ now uses validated env var
      });

      googleUserData = ticket.getPayload();
      log('Google token verified successfully: ' + JSON.stringify(googleUserData, null, 2));
    } catch (error) {
      log('Error verifying Google token: ' + ((error as any)?.message || 'unknown error'));
      throw new AppError(
        i18n.translate(GeneralMessages.INVALID_GOOGLE_TOKEN),
        HttpStatusCodeEnum.UNAUTHORIZED
      );
    }

    if (!googleUserData?.email) {
      throw new AppError(
        i18n.translate(GeneralMessages.EMAIL_NOT_FOUND_IN_GOOGLE_TOKEN),
        HttpStatusCodeEnum.UNAUTHORIZED
      );
    }

    // ─── Exchange auth code for tokens ─────────────────────────────────────────
    try {
      log('getting google tokens from auth code');
      const googleTokens: IGoogleTokens | undefined = await getTokensFromAuthCode(user.authCode);
      log(
        'Google tokens retrieved successfully, has refresh_token: ' + !!googleTokens?.refresh_token
      );

      // ─── Find or create user ──────────────────────────────────────────────────
      log('searching for user with email: ' + googleUserData.email);
      let foundUser: IUser | null = await this.userRepository.getByEmail(googleUserData.email);

      if (foundUser) {
        log('User found, updating refresh token');
        await this.userRepository.update(foundUser.id ?? (foundUser as any)._id, {
          refreshToken: googleTokens?.refresh_token,
        });
      } else {
        log('User not found, creating new user');
        const newUserData: IUser = { ...user };

        if (user.groupIds) newUserData.groupIds = user.groupIds;
        if (user.academyId) newUserData.academyId = user.academyId;
        if (googleTokens?.refresh_token) newUserData.refreshToken = googleTokens.refresh_token;

        foundUser = await this.userRepository.create(newUserData);
        log('New user created with ID: ' + foundUser?.id);
      }

      if (!foundUser.profilePhoto && user.profilePhoto) {
        foundUser.profilePhoto = user.profilePhoto;
        await this.userRepository.update(foundUser.id, { profilePhoto: user.profilePhoto });
      }

      // ─── Generate JWT ─────────────────────────────────────────────────────────
      const updatedUser = {
        ...foundUser,
        id: (foundUser as any)?._id || foundUser.id,
      };

      const jwtPayload = {
        userId: updatedUser.id,
        academyId: updatedUser.academyId,
        isAdmin: updatedUser.isAdmin,
      };

      log('Generating JWT for user', jwtPayload);

      const jwtToken = jwt.sign(jwtPayload, jwtSecret, {
        expiresIn: EXPIRATION_TIME,
        algorithm: JWT_ALGORITHM,
      });

      if ('_id' in updatedUser) {
        delete (updatedUser as any)._id;
      }

      const userWithToken: UserWithToken & { googleTokens?: IGoogleTokens } = {
        ...updatedUser,
        token: jwtToken,
        googleTokens,
      };

      log('User signin/signup process completed successfully');
      return userWithToken;
    } catch (error) {
      if (error instanceof AppError) {
        log('AppError processing user data: ' + error.message);
        throw error; // re-throw as-is, don't wrap again
      }

      log(
        'Unknown error: ' +
          (JSON.stringify((error as any)?.response?.data) || (error as any)?.message)
      );
      throw new AppError(
        i18n.translate(GeneralMessages.ERROR_PROCESSING_USER_DATA),
        HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(req: AuthenticatedRequest<IRefreshToken>): Promise<IResponseRefreshToken> {
    try {
      log('Starting token refresh process');
      // Extrai as informações do usuário do token renovado

      const user = await this.userService.getLoggedUser(req);

      const refreshToken = req.headers['x-refresh-token'] ?? user?.refreshToken;

      if (!refreshToken) {
        log('No refresh token found for user');
        throw new AppError(
          i18n.translate(GeneralMessages.REFRESH_TOKEN_NOT_FOUND),
          HttpStatusCodeEnum.UNAUTHORIZED
        );
      }

      const googleTokens = await refreshGoogleTokens(refreshToken as string);

      log('refreshing Google tokens using refresh token', refreshToken);
      log('Google tokens refreshed: ' + JSON.stringify(googleTokens, null, 2));

      if (!user) {
        throw new AppError(
          i18n.translate(GeneralMessages.USER_NOT_FOUND),
          HttpStatusCodeEnum.NOT_FOUND
        );
      }

      // Gera um novo JWT
      log('Generating new JWT for user');
      const jwtPayload = {
        userId: user.id,
        academyId: user.academyId,
        isAdmin: user.isAdmin,
      };

      const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
        expiresIn: EXPIRATION_TIME,
        algorithm: JWT_ALGORITHM,
      });
      log('New JWT generated');

      // Retorna o novo token JWT
      return {
        token: jwtToken,
        googleTokens,
      };
    } catch (error) {
      log('Error refreshing token: ' + (error as any)?.message || 'unknown error');
      throw new AppError(
        i18n.translate(GeneralMessages.FAILED_REFRESH_TOKEN),
        HttpStatusCodeEnum.UNAUTHORIZED
      );
    }
  }

  async signout(req: AuthenticatedRequest): Promise<void> {
    // In this OAuth scenario, for logout, you can simply delete the token on the frontend,
    // or, if necessary, revoke the token on Google (though this is generally not required).
    // This function can be kept for compatibility or to perform additional actions.
  }

  async generateTestToken(
    req: AuthenticatedRequest<{ userId: string; email: string; isAdmin: boolean }>
  ) {
    // Check if in development environment
    if (process.env.NODE_ENV !== 'development') {
      throw new AppError(
        'This endpoint is only available in development mode',
        HttpStatusCodeEnum.FORBIDDEN
      );
    }

    // You can allow specifying the user by ID or email//
    const { userId, email, isAdmin = false } = req.body;

    let user: IUser | null = null;

    if (userId) {
      user = await this.userRepository.getById(userId);
    } else if (email) {
      user = await this.userRepository.getByEmail(email);
    } else {
      throw new AppError('Either userId or email is required', HttpStatusCodeEnum.BAD_REQUEST);
    }

    if (!user) {
      throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    // Generate JWT with user information
    const jwtPayload = {
      userId: user.id,
      academyId: user.academyId,
      isAdmin: isAdmin ? true : user.isAdmin,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
      expiresIn: EXPIRATION_TIME,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        academyId: user.academyId,
        isAdmin: isAdmin ? true : user.isAdmin,
      },
    };
  }
}
