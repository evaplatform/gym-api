import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { IAuthService } from './IAuthService';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { OAuth2Client } from 'google-auth-library';
import { getTokensFromAuthCode } from '../../shared/utils/getTokensFromAuthCode';
import { IGoogleTokens } from '../../shared/interfaces/IGoogleTokens';
import { log } from '../../shared/utils/log';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) { }

  // Aqui o parâmetro pode ser o token do Google recebido do front
  async signinOurCreate(
    user: UserWithToken & { authCode: string; codeVerifier: string; uriRedirect: string }
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
      // A resposta geralmente contém:
      // {
      //    sub: "ID único do Google",
      //    name: "Nome do usuário",
      //    email: "user@gmail.com",
      //    picture: "URL da foto",
      //    ...
      // }
    } catch (error) {
      log("Starting Google Signin/Signup process");
      throw new AppError('Invalid Google token', HttpStatusCodeEnum.UNAUTHORIZED);
    }

    // Verifica se o usuário existe no seu banco de dados
    let foundUser: IUser | null = await this.userRepository.getByEmail(googleUserData.email);

    // Se o usuário ainda não existe, você pode criar um novo registro ou retornar erro.
    if (!foundUser) {
      const newUserData: IUser = {
        // id: googleUserData.sub,
        firstName: googleUserData.name,
        lastName: googleUserData.name.split(' ')[1] || '',
        email: googleUserData.email,
        profilePhoto: googleUserData.picture,
      } as IUser;

      if (user.groupId) {
        newUserData.groupId = user.groupId;
      }

      if (user.academyId) {
        newUserData.academyId = user.academyId;
      }

      foundUser = await this.userRepository.create(newUserData);
    }

    // // Opcional: se você quiser gerar um JWT próprio para manter o estado da sessão,
    // // você pode assinar um token com os dados do usuário.
    // const token = jwt.sign(
    //     { id: foundUser.id, role: foundUser.groupId },
    //     process.env.JWT_SECRET as string,
    //     { expiresIn: '1h' }
    // );

    // Removendo a propriedade sensível "password" se existir
    try {
      const { password: _, ...userWithoutPassword } = foundUser;

      const googleTokens = await getTokensFromAuthCode(user.authCode, user.codeVerifier, user.uriRedirect);

      const userWithToken: UserWithToken & { googleTokens?: IGoogleTokens } = {
        ...userWithoutPassword,
        token: user.token,
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
}
