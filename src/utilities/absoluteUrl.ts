import dotenv from 'dotenv';

dotenv.config();

export const absoluteUrl = `http://${process.env.API_URL}:${process.env.SERVER_PORT}/`;
