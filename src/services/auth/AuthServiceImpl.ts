import axios from 'axios';
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
import { IGoogleUserInfo } from '../../shared/interfaces/IGoogleUserInfo';
import { UserWithToken } from '../../shared/types/AuthResponse';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


type SigningRequestType = UserWithToken & { authCode: string; }

export class AuthServiceImpl implements IAuthService {

  constructor(private readonly userRepository: IUserRepository) { }

  // Aqui o parâmetro pode ser o token do Google recebido do front
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
      // Chamada para a API do Google para validar o token e obter os dados do usuário.
      const ticket = await client.verifyIdToken({
        idToken: user.token, // aqui é o id_token que você recebeu do front
        audience: process.env.GOOGLE_CLIENT_ID, // verificação de segurança
      });

      googleUserData = (ticket as any).payload;
    } catch (error) {
      log("Error verifying Google token: " + (error as any)?.message || "unknown error");
      throw new AppError('Invalid Google token', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    // Verifica se o usuário existe no seu banco de dados
    let foundUser: IUser | null = await this.userRepository.getByEmail(googleUserData.email);

    // Se o usuário ainda não existe, você pode criar um novo registro ou retornar erro.
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

    // Removendo a propriedade sensível "password" se existir
    try {
      const googleTokens = {} as any; //await getTokensFromAuthCode(user.authCode);

      if (!foundUser.profilePhoto) {
        foundUser.profilePhoto = user.profilePhoto;
        await this.userRepository.update(foundUser.id, { profilePhoto: user.profilePhoto });
      }


      // Gerar JWT com informações do usuário
      const jwtPayload = {
        userId: foundUser.id,
        academyId: foundUser.academyId,
        isAdmin: foundUser.isAdmin
      };

      const jwtToken = jwt.sign(
        jwtPayload,
        process.env.JWT_SECRET as string,
        { expiresIn: '24h', algorithm: 'HS256' } // Você pode ajustar o tempo de expiração
      );


      const userWithToken: UserWithToken & { googleTokens?: IGoogleTokens } = {
        ...foundUser,
        token: jwtToken,
        googleTokens,
      };

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

  async signout(userInput: IUser): Promise<void> {
    // Neste cenário com OAuth, para o logout você pode simplesmente apagar o token no front,
    // ou, se necessário, revogar o token no Google (embora isso geralmente não seja obrigatório).
    // Essa função pode ser mantida para compatibilidade ou para realizar ações adicionais.
  }

  async generateTestToken(req: any) {
    // Verifique se está em ambiente de desenvolvimento
    if (process.env.NODE_ENV !== 'development') {
      throw new AppError('This endpoint is only available in development mode', HttpStatusCodeEnum.FORBIDDEN);
    }

    // Você pode permitir especificar o usuário pelo ID ou email
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

    // Gerar JWT com as informações do usuário
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
