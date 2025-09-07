import axios from 'axios';
import qs from 'qs';
import { IGoogleTokens } from '../interfaces/IGoogleTokens';
import { log } from './log';

export async function getTokensFromAuthCode(authCode: string): Promise<IGoogleTokens | undefined> {
  try {
    const data = {
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',// process.env.GOOGLE_REDIRECT_URI, // Isso é obrigatório
      grant_type: 'authorization_code' // Isso também é obrigatório
    };

    log('Token exchange request data:', data);

    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify(data), // Apenas qs.stringify, não JSON.stringify
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    log('Token exchange response:', response.data);

    return response.data as IGoogleTokens;
  } catch (error) {
    log('Error exchanging auth code for tokens:', error);
    if (axios.isAxiosError(error) && error.response) {
      log('Error response data:', error.response.data);
    }
    throw error;
  }
}