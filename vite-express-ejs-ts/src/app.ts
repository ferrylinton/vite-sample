import express from 'express';
import itemRoutes from './routes/item-routes';
import { errorHandler } from './middlewares/error-handler';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use('/assets', express.static(path.join(__dirname, 'assets'))); 

app.get('/', (req, res) => {
  const data = { title: 'Express EJS with TypeScript', message: 'Hello from EJS!' };
  res.render('index', data);
});

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);


export const viteNodeApp = app;