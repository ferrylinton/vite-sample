import { CAPTCHA_COOKIE_MAX_AGE } from '@/config/env-constant';
import { generateCoreCaptcha, generateRandomText } from '@/services/captcha-service';
import { encrypt } from '@/utils/encrypt-util';
import express, { NextFunction, Request, Response } from 'express';

const viewCaptchaHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const randomText = generateRandomText(true, 5, true);
		const canvas = generateCoreCaptcha(randomText);
		const encryptedText = await encrypt(randomText);

		res.cookie('captcha', encryptedText, {
					maxAge: CAPTCHA_COOKIE_MAX_AGE,
					httpOnly: true,
				});

		res.set('Content-Type', 'image/png');
    	res.send(canvas.toBuffer());
	} catch (error) {
		next(error);
	}
};



/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/captcha', viewCaptchaHandler);

export default router;
