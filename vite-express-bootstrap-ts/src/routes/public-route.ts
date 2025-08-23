import express, { NextFunction, Request, Response } from 'express';

const viewAboutHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('about');
	} catch (error) {
		next(error);
	}
};

const viewAuthorHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('author');
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/about', viewAboutHandler);

router.get('/author', viewAuthorHandler);

export default router;
