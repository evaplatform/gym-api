import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IAuthService } from './IAuthService';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { OAuth2Client } from 'google-auth-library';
import { getTokensFromAuthCode } from '../../shared/utils/getTokensFromAuthCode';
import { IGoogleTokens } from '../../shared/interfaces/IGoogleTokens';
import { log } from '../../shared/utils/log';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

type SigningRequestType = UserWithToken & { authCode: string; }

export class AuthServiceImpl implements IAuthService {

  constructor(private readonly userRepository: IUserRepository) { }

  // The parameter here can be the Google token received from the frontend
  async signinOrCreate(
    user: SigningRequestType
  ): Promise<UserWithToken & { googleTokens?: IGoogleTokens }> {

    log("Starting Google Signin/Signup process");

    let googleUserData: {
      sub: string;
      name: string;
      email: string;
      picture: string;
    } = {} as any;

    try {
      // Call the Google API to validate the token and retrieve user data
      const ticket = await client.verifyIdToken({
        idToken: user.token, // this is the id_token received from the frontend
        audience: process.env.GOOGLE_CLIENT_ID, // security check
      });

      googleUserData = (ticket as any).payload;
    } catch (error) {
      log("Error verifying Google token: " + (error as any)?.message || "unknown error");
      throw new AppError('Invalid Google token', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    // Check if the user exists in your database
    let foundUser: IUser | null = await this.userRepository.getByEmail(googleUserData.email);

    // If the user does not exist, you can create a new record or return an error
    if (!foundUser) {
      const newUserData: IUser = { ...user }

      if (user.groupId) {
        newUserData.groupId = user.groupId;
      }

      if (user.academyId) {
        newUserData.academyId = user.academyId;
      }

      foundUser = await this.userRepository.create(newUserData);
    }

    // Remove the sensitive "password" property if it exists
    try {
      const googleTokens = await getTokensFromAuthCode(user.authCode);

      if (!foundUser.profilePhoto) {
        foundUser.profilePhoto = user.profilePhoto;
        await this.userRepository.update(foundUser.id, { profilePhoto: user.profilePhoto });
      }

      // Generate JWT with user information
      const jwtPayload = {
        userId: foundUser.id,
        academyId: foundUser.academyId,
        isAdmin: foundUser.isAdmin
      };

      const jwtToken = jwt.sign(
        jwtPayload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1m', algorithm: 'HS256' } // You can adjust the expiration time
      );

      const userWithToken: UserWithToken & { googleTokens?: IGoogleTokens } = {
        ...foundUser,
        token: jwtToken,
        googleTokens,
      };

      const updatedUser = { ...foundUser, id: (foundUser as any)?._id || foundUser.id };

      if("_id" in updatedUser) {
        delete updatedUser._id;
      }

      return userWithToken;
    } catch (error) {

      if (error instanceof AppError) {

        log("Error processing user data " + error.message)
        log(JSON.stringify((error as any)?.response?.data, null, 2) || error.message)

        throw new AppError('Error processing user data', error.statusCode);
      } else {

        log(JSON.stringify((error as any)?.response?.data, null, 2) || (error as any)?.message || 'Unknown error');
        log("Error processing user data: Unknown error");
        throw new AppError('Error processing user data', HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
      }

    }
  }

  async signout(req: AuthenticatedRequest): Promise<void> {
    // In this OAuth scenario, for logout, you can simply delete the token on the frontend,
    // or, if necessary, revoke the token on Google (though this is generally not required).
    // This function can be kept for compatibility or to perform additional actions.
  }

  async generateTestToken(req: AuthenticatedRequest<{ userId: string; email: string; isAdmin: boolean }>) {
    // Check if in development environment
    if (process.env.NODE_ENV !== 'development') {
      throw new AppError('This endpoint is only available in development mode', HttpStatusCodeEnum.FORBIDDEN);
    }

    // You can allow specifying the user by ID or email
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
      isAdmin: isAdmin ? true : user.isAdmin
    };

    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        academyId: user.academyId,
        isAdmin: isAdmin ? true : user.isAdmin
      }
    };
  }

}
