import { Router } from "express";
import TasksControllers from "./tasks.controllers";
import TasksServices from "./tasks.services";

const tasksServices = new TasksServices();
const tasksControllers = new TasksControllers(tasksServices);
const router = Router();

// Create new task route.
router.post("/", tasksControllers.createTaskController);

// Get all tasks route
router.get("/", tasksControllers.getAllTasksController);

// Get task by id route
router.get("/:id", tasksControllers.getTaskByIdController)

// Update task by id route
router.put("/:id", tasksControllers.updateTaskByIdController);

// Delete task by id route
router.delete("/:id", tasksControllers.deleteTaskByIdController);

export default router;