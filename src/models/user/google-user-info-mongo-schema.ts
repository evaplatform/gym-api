import mongoose from 'mongoose';
import { IGoogleUserInfo } from '../../shared/interfaces/IGoogleUserInfo';

export const googleUserInfoSchema = new mongoose.Schema<IGoogleUserInfo>({
    email: { type: String, required: true },
    familyName: { type: String, required: false },
    givenName: { type: String, required: false },
    id: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: false },
});
