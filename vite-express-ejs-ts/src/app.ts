import express from 'express';
import itemRoutes from './routes/item-routes';
import { errorHandler } from './middlewares/error-handler';
import path from 'path';
import favicon from 'express-favicon';
import config from './config/config';

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
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

app.use(function (req, res, next) {
	try {
		res.locals.currentPath = req.path;
		res.locals.NODE_ENV = config.NODE_ENV;

		next();
	} catch (error) {
		next(error);
	}
});

app.get('/', (req, res) => {
  const data = { title: 'Express EJS with TypeScript', message: 'Hello from EJS!' };
  res.render('index', data);
});

app.get('/about', (req, res) => {
  const data = { title: 'Express EJS with TypeScript', message: 'Hello from EJS!' };
  res.render('about', data);
});

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);


export const viteNodeApp = app;