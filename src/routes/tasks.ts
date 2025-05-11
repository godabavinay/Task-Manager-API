import { Router } from 'express';
import * as tasksController from '../controllers/tasks';

const router = Router();

router.get('/', tasksController.listTasks);
router.get('/:id', tasksController.getTask);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

export default router;