import 'dotenv/config';

interface Config {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    NODE_ENV: 'development' | 'production' | 'test';
}

export const config: Config = {
    PORT: Number(process.env.PORT || 3000),
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/decleanup',
    JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-for-development-only',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
    NODE_ENV: (process.env.NODE_ENV as Config['NODE_ENV']) || 'development',
}; 