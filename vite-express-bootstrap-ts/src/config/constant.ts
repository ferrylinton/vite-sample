import * as dotenv from 'dotenv';
dotenv.config();

interface Constant {
    port: number
    NODE_ENV: string

    LOGGER_LEVEL: string
    LOGGER_HIDE_CONSOLE: string

    MONGODB_URL: string
    MONGODB_AUTH_SOURCE: string
    MONGODB_USERNAME: string
    MONGODB_PASSWORD: string
    MONGODB_DATABASE: string

    PAGE_SIZE: number
}

if (!process.env.MONGODB_URL) {
	throw new Error('Invalid environment variable: "MONGODB_URL"');
}

if (!process.env.MONGODB_AUTH_SOURCE) {
	throw new Error('Invalid environment variable: "MONGODB_AUTH_SOURCE"');
}

if (!process.env.MONGODB_USERNAME) {
	throw new Error('Invalid environment variable: "MONGODB_USERNAME"');
}

if (!process.env.MONGODB_PASSWORD) {
	throw new Error('Invalid environment variable: "MONGODB_PASSWORD"');
}

if (!process.env.MONGODB_DATABASE) {
	throw new Error('Invalid environment variable: "MONGODB_DATABASE"');
}

const constant: Constant = {
    port: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    LOGGER_LEVEL : process.env.LOGGER_LEVEL || 'warn',
    LOGGER_HIDE_CONSOLE : process.env.LOGGER_HIDE_CONSOLE || 'true',

    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_AUTH_SOURCE: process.env.MONGODB_AUTH_SOURCE,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,

    PAGE_SIZE : 10,
};

export default constant;