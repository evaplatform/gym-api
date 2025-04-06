import bcrypt from 'bcryptjs';
import { SALT } from '../constants';

export async function encrypt(value: string) {
    const encryptedValue = await bcrypt.hash(value, SALT);
    return encryptedValue;
}