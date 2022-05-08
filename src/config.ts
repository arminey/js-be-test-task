import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    VERIFF_URL: process.env.VERIFF_URL,
    SESSION_UUID: process.env.SESSION_UUID
}