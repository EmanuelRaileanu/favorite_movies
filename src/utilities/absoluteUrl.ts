import dotenv from 'dotenv';

dotenv.config();

export const absoluteUrl = `http://localhost:${process.env.SERVER_PORT}/`;
