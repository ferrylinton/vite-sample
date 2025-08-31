
import { NODE_ENV } from '@/config/env-constant';
import { i18nConfig } from '@/config/i18n-config';
import { errorHandler } from '@/middlewares/error-handler';
import { scriptInjectorMiddleware } from '@/middlewares/inject-script';
import messageRoute from '@/routes/message-route';
import publicRoute from '@/routes/public-route';
import todoRoute from '@/routes/todo-route';
import captchaRoute from '@/routes/captcha-route';
import { QueryParams } from '@/types/express-type';
import { getBootstrapVariants, initLocale, initTheme, initVariant } from '@/utils/app-util';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import favicon from 'express-favicon';
import path from 'path';


export const app = express();
app.set('trust proxy', 1);

app.use(compression());
app.use(cookieParser());
i18nConfig(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

if (import.meta.env?.PROD) app.use(favicon(path.join(__dirname, 'favicon.ico')));
else app.use(favicon(path.join(import.meta.dirname, 'favicon.ico')));

if (import.meta.env?.PROD) app.set('views', path.join(__dirname, 'views'));
else app.set('views', path.join(import.meta.dirname, 'views'));

if (import.meta.env?.PROD) app.use('/assets', express.static(path.join(__dirname, 'assets')));
else app.use('/assets', express.static(path.join(import.meta.dirname, 'assets')));

app.use((req: Request<{}, {}, {}, QueryParams>, res: Response, next: NextFunction) => {
	try {
		const { variants } = getBootstrapVariants();
		res.locals.currentPath = req.path;
		res.locals.NODE_ENV = NODE_ENV;
		res.locals.bootstrapVariants = variants;
		res.locals.formData = {};
		res.locals.errorValidations = {};


		res.locals.isChecked = (arg: any) => {
			return arg ? 'checked' : 'false';
		};

		res.locals.formControl = (field: string, clazz: String, errorValidations: any) => {
			if (typeof errorValidations !== 'undefined' && errorValidations[field]) {

				return `
				<div class="invalid-feedback">
            		${res.t(errorValidations.email.errors[0])}
          		</div>
				`
			} else {
				return ` id="${field}" name="${field}" class= `;
			}
		}

		res.locals.isInvalid = (errorValidations: any, field: string) => {
			console.log(res.locals.errorValidations)
			return (typeof errorValidations !== 'undefined' && errorValidations[field]) ? 'is-invalid' : '';
		}

		res.locals.invalidFeedback = (errorValidations: any, field: string) => {
			if (typeof errorValidations !== 'undefined' && errorValidations[field]) {

				return `
				<div class="invalid-feedback">
            		${res.t(errorValidations[field].errors[0])}
          		</div>
				`
			} else {
				return '';
			}
		}

		initLocale(req, res);
		initVariant(req, res);
		initTheme(req, res);

		next();
	} catch (error) {
		next(error);
	}
});

if (!import.meta.env?.PROD)
	app.use(
		scriptInjectorMiddleware(
			`<script type="module" src="/@vite/client?t=${new Date().getTime()}"></script>`
		)
	);

// Routes
app.use('/', publicRoute);
app.use('/', messageRoute);
app.use('/', todoRoute);
app.use('/', captchaRoute);

app.use(/^\/(?!.*css).*$/, (_req, res, _next) => {
	res.render('not-found');
});

// Global error handler (should be after routes)
app.use(errorHandler);
