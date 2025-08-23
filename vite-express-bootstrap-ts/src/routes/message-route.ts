import express, { NextFunction, Request, Response } from 'express';

const viewCreateHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('messages/message-create');
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/message', viewCreateHandler);

export default router;
