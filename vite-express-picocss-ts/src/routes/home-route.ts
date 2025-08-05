import { createMessage } from '@/services/message-service';
import { createTodo, findTodoes } from '@/services/todo-service';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  //createMessage({email: "ferrylinton@gmail.com", content: "testsss"});
  // for(let i=0; i<10; i++){
  //   createTodo(`task-${i}`);
  // }

  const todoes = await findTodoes();
  res.render('index', { todoes });
});


export default router;