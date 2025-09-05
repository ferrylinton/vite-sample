import { login } from '@/services/auth-service';
import { createUser } from '@/services/user-service';
import { decrypt } from '@/utils/encrypt-util';
import { LoginValidation } from '@/validations/auth-validation';
import { CreateUserValidation } from '@/validations/user-validation';
import express, { NextFunction, Request, Response } from 'express';

const viewLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('login');
	} catch (error) {
		next(error);
	}
};

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = LoginValidation.safeParse(req.body);

		if (validation.success) {
			const captchaFromCookies = req.cookies['captcha'];

			if (!captchaFromCookies) {
				return res.render('messages/message-create', {
					message: res.t("captchaIsExpired"),
					formData: req.body,
					errorValidations: {}
				});
			}

			const plainCaptcha = await decrypt(captchaFromCookies);
			if (plainCaptcha !== validation.data.captcha) {
				res.render('messages/message-create', {
					message: res.t("captchaIsNotMatch"),
					formData: req.body,
					errorValidations: {}
				});
			} else {
				const { email, password } = validation.data;
				const user = await login(email, password);
				res.redirect('/');
			}


		} else {
			const { fieldErrors } = validation.error.flatten();
			res.status(400).json(fieldErrors);
		}
		res.render('register');
	} catch (error) {
		next(error);
	}
};

const viewRegister = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('register');
	} catch (error) {
		next(error);
	}
};

const postRegister = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = CreateUserValidation.safeParse(req.body);

		if (validation.success) {
			const { passwordConfirm, ...input } = validation.data;
			const user = await createUser(input, req.loggedUser.username);
			res.status(201).json(user);
		} else {
			const { fieldErrors } = validation.error.flatten();
			res.status(400).json(fieldErrors);
		}
		res.render('register');
	} catch (error) {
		next(error);
	}
};

const viewForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('forgot-password');
	} catch (error) {
		next(error);
	}
};

const viewResetPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('reset-password');
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/login', viewLogin);

router.get('/register', viewRegister);

router.get('/forgotpassword', viewForgotPassword);

router.get('/resetpassword', viewResetPassword);


export default router;
