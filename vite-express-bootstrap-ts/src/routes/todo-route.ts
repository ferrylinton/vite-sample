import { MESSAGE } from '@/config/app-constant';
import constant from '@/config/env-constant';
import {
	countTodoes,
	createTodo,
	deleteTodoById,
	findTodoById,
	findTodoes,
	updateTodo,
} from '@/services/todo-service';
import { CreateTodoValidation } from '@/validations/todo-validation';
import express, { NextFunction, Request, Response } from 'express';
import { treeifyError } from 'zod';

const viewListHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const todoes = await findTodoes();
		const total = await countTodoes();
		const message = req.cookies[MESSAGE];

		res.cookie(MESSAGE, '', { expires: new Date(0) });

		res.render('todoes/todo-list', {
			todoes,
			total,
			message,
		});
	} catch (error) {
		next(error);
	}
};

const viewDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id;
		const todo = await findTodoById(id);
		res.render('todoes/todo-detail', {
			todo,
		});
	} catch (error) {
		next(error);
	}
};

const viewCreateHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.render('todoes/todo-create');
	} catch (error) {
		next(error);
	}
};

const createTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const total = await countTodoes();

		if (total >= 20) {
			res.render('todoes/todo-create', {
				errorMaxData: 'maxData',
			});
		} else {
			const validation = CreateTodoValidation.safeParse(req.body);

			if (validation.success) {
				let task = req.body.task;
				await createTodo(task);
				res.cookie(MESSAGE, res.t('dataIsCreated', task), {
					maxAge: constant.TOAST_COOKIE_MAX_AGE,
					httpOnly: true,
				});
				res.redirect('/');
			} else {
				const errorValidations = treeifyError(validation.error).properties;
				console.log(errorValidations);
				res.render('todoes/todo-create', {
					errorValidations,
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.render('todoes/todo-create', {
			error,
		});
	}
};

const viewUpdateHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id;
		const todo = await findTodoById(id);
		res.render('todoes/todo-update', {
			todo,
		});
	} catch (error) {
		next(error);
	}
};

const updateTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id;
		const current = await findTodoById(id);

		if (current) {
			await updateTodo(id, req.body.task, req.body.done === 'true');
			res.cookie(MESSAGE, res.t('dataIsUpdated', current.task), {
				maxAge: 3000,
				httpOnly: true,
			});
		}

		res.redirect('/');
	} catch (error) {
		next(error);
	}
};

const deleteTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id;
		const current = await findTodoById(id);

		if (current) {
			await deleteTodoById(id);
			res.cookie(MESSAGE, res.t('dataIsDeleted', current.task), {
				maxAge: 3000,
				httpOnly: true,
			});
		}

		res.status(200).json({ message: 'OK' });
	} catch (error) {
		next(error);
	}
};

const toggleStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id;
		const current = await findTodoById(id);

		if (current) {
			await updateTodo(id, current.task, !current.done);
			res.locals.message = 'Data is updated';
			res.cookie(MESSAGE, res.t('dataIsUpdated', current.task), {
				maxAge: 3000,
				httpOnly: true,
			});
		}

		res.status(200).json({ message: 'OK' });
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/', viewListHandler);
router.get('/todoes/detail/:id', viewDetailHandler);

router.get('/todoes/create', viewCreateHandler);
router.post('/todoes/create', createTodoHandler);

router.get('/todoes/update/:id', viewUpdateHandler);
router.post('/todoes/update/:id', updateTodoHandler);
router.put('/api/todoes/:id', toggleStatusHandler);

router.delete('/api/todoes/:id', deleteTodoHandler);

export default router;
