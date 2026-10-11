import axios from 'axios';
import qs from 'qs';
import { IGoogleTokens } from '../interfaces/IGoogleTokens';
import { log } from './log';

export async function getTokensFromAuthCode(
  authCode: string
): Promise<IGoogleTokens | undefined> {
  if (!authCode) {
    log('No authCode provided, skipping token exchange');
    return undefined;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  // ─── Validate env vars ────────────────────────────────────────────────────
  if (!clientId || !clientSecret) {
    throw new Error(
      `Missing Google credentials:
       GOOGLE_CLIENT_ID    : ${clientId ? '✅' : '❌ missing'}
       GOOGLE_CLIENT_SECRET: ${clientSecret ? '✅' : '❌ missing'}`
    );
  }

  const data = {
    code: authCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: '',                  // ← required by Google, empty string for mobile
    grant_type: 'authorization_code',
  };

  log('Token exchange request data:', {
    code: authCode.substring(0, 20) + '...',
    client_id: clientId,
    grant_type: data.grant_type,
    redirect_uri: '(empty string)',
  });

  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    log('Token exchange response:', {
      access_token: response.data.access_token?.substring(0, 20) + '...',
      has_refresh_token: !!response.data.refresh_token,
      expires_in: response.data.expires_in,
      scope: response.data.scope,
    });

    return response.data as IGoogleTokens;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      log('Token exchange failed:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      log('Token exchange unknown error:', error);
    }
    throw error;
  }
}