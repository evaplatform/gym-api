import axios from 'axios';
import qs from 'qs';
import { IGoogleTokens } from '../interfaces/IGoogleTokens';

export async function getTokensFromAuthCode(authCode: string): Promise<IGoogleTokens | undefined> {
  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code: authCode, // O código de autorização
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI, // O mesmo redirect_uri usado na solicitação inicial
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data; // Isso irá conter o refresh_token
  } catch (error) {
    console.error('Error exchanging auth code for tokens', error);
  }
}
