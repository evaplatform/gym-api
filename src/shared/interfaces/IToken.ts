import { IGoogleTokens } from "./IGoogleTokens";

export interface IResponseRefreshToken {
    token: string;
    googleTokens: IGoogleTokens;
}