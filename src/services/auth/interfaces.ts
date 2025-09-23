import { IGoogleTokens } from "@/shared/interfaces/IGoogleTokens";

export interface IResponseRefreshToken {
    token: string;
    googleTokens: IGoogleTokens;
}