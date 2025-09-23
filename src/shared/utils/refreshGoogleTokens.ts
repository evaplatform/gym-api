import axios from "axios";
import { IGoogleTokens } from "../interfaces/IGoogleTokens";
import { AppError } from "@/errors/AppError";
import { HttpStatusCodeEnum } from "../enums/HttpStatusCodeEnum";

export async function refreshGoogleTokens(refreshToken: string): Promise<IGoogleTokens> {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        });

        return {
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            id_token: response.data.id_token,
            refresh_token: refreshToken, // O refresh_token permanece o mesmo
            scope: response.data.scope,
            token_type: response.data.token_type
        };
    } catch (error) {
        console.error('Error refreshing Google token:', error);
        throw new AppError('Failed to refresh Google token', HttpStatusCodeEnum.UNAUTHORIZED);
    }
}