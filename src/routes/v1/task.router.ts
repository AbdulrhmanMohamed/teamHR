import { Router } from "express";
import { getAllTasks,getTaskById,updateTask,deleteTask, addTask } from "../../controllers/task/task.controller";
const router=Router();
router.route('/')
.get(getAllTasks)
.post(addTask)

router.route('/:id')
.get(getTaskById)
.put(updateTask)
.delete(deleteTask)

export default router;