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

    APP_NAME : string
    COOKIE_SECRET : string
    APP_COOKIE_MAX_AGE: number
    TOAST_COOKIE_MAX_AGE: number
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

    APP_NAME : process.env.APP_NAME || 'TODO',
    COOKIE_SECRET : process.env.COOKIE_SECRET || 'ferrylinton',
    APP_COOKIE_MAX_AGE : process.env.APP_COOKIE_MAX_AGE ? parseInt(process.env.APP_COOKIE_MAX_AGE) : 30 * 24 * 60 * 60 * 1000,
    TOAST_COOKIE_MAX_AGE : process.env.TOAST_COOKIE_MAX_AGE ? parseInt(process.env.TOAST_COOKIE_MAX_AGE) : 5 * 1000
};

export default constant;