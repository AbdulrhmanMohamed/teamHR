import { Router } from "express";
import { getAllTasks,getTaskById,updateTask,deleteTask, addTask } from "../../controllers/task/task.controller";
import { validator } from "../../middlewares/validate";
import { taskValidation } from "../../validators/task.validator";
const router=Router();
router.route('/')
.get(getAllTasks)
.post(validator(taskValidation,'post'), addTask)

router.route('/:id')
.get(getTaskById)
.delete(deleteTask)
.put(validator(taskValidation,'put'),updateTask)

export default router;