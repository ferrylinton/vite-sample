import constant from '@/config/env-constant';
import config from '@/config/env-constant';
import { DEFAULT_LOCALE, i18nConfig, LOCALES } from '@/config/i18n-config';
import { errorHandler } from '@/middlewares/error-handler';
import { scriptInjectorMiddleware } from '@/middlewares/inject-script';
import todoRoute from '@/routes/todo-route';
import { QueryParams } from '@/types/express-type';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import favicon from 'express-favicon';
import path from 'path';
import { initLocale, initTheme, initVariant } from './utils/app-util';

export const app = express();
app.set('trust proxy', 1);

app.use(compression());
app.use(cookieParser());
i18nConfig(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

if (import.meta.env?.PROD)
	app.use(favicon(path.join(__dirname, 'favicon.ico')));
else
	app.use(favicon(path.join(import.meta.dirname, 'favicon.ico')));

if (import.meta.env?.PROD)
	app.set('views', path.join(__dirname, 'views'));
else
	app.set('views', path.join(import.meta.dirname, 'views'));

if (import.meta.env?.PROD)
	app.use('/assets', express.static(path.join(__dirname, 'assets')));
else
	app.use('/assets', express.static(path.join(import.meta.dirname, 'assets')));

app.use((
	req: Request<{}, {}, {}, QueryParams>,
	res: Response,
	next: NextFunction) => {

	try {
		res.locals.currentPath = req.path;
		res.locals.NODE_ENV = config.NODE_ENV;

		initLocale(req, res);
		initVariant(req, res);
		initTheme(req, res);

		next();
	} catch (error) {
		next(error);
	}

});

if (!import.meta.env?.PROD)
	app.use(scriptInjectorMiddleware(`<script type="module" src="/@vite/client?t=${new Date().getTime()}"></script>`));

// Routes
app.use('/', todoRoute);

app.use(/^\/(?!.*css).*$/, (_req, res, _next) => {
	res.render('not-found');
});

// Global error handler (should be after routes)
app.use(errorHandler);
