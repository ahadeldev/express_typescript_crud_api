import { Request, Response, NextFunction } from "express";
import ApiError from "../shared/api.error";
import ApiResponse from "../shared/api.response";
import returnError from "../utils/return.error";
import httpStatusCodes from "../shared/http.status.codes";
import TasksServices from "./tasks.services";
import Task from "../dtos/task.dto";
import Pagination from "../dtos/pagination.dto";

class TasksControllers {
  // Injecting tasks services class.
  constructor(private readonly tasksServices: TasksServices){}

  // @desc    Create new Task
  // @route   POST /api/v1/tasks
  // @access  Public
  createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    const task: Task = req.body;
    if(!task || !task.title){
      return next(new ApiError("task can't be empty, title is required", httpStatusCodes.UNPROCESSABLE_ENTITY));
    }
    try {
      const newTask = await this.tasksServices.createTask(task);
      const response = new ApiResponse(httpStatusCodes.RESOURCE_CREATED, "TASK CREATED", newTask);
      response.send(res);
    } catch (err: any) {
      returnError(err, next);
    }
  }

  // @desc    Get all tasks
  // @route   GET /api/v1/tasks?page=pageIdx
  // @access  Public
  getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    const page: string = req.query.page as string || "1";
    const pageNum: number = parseInt(page, 10);
    try {
       const allTasks = await this.tasksServices.getAllTasks(pageNum);
       const pagination: Pagination = {
        totalTasks: allTasks.totalTasks,
        totalPages: allTasks.totalPages,
        currentPage: allTasks.currentPage
       };
       const response = new ApiResponse(
        httpStatusCodes.OK,
        "ALL TASKS",
        allTasks.tasks ? allTasks.tasks : [], 
        pagination
      );
      response.send(res)
    } catch (err: any) {
      returnError(err, next)
    }
  }

  // @desc    Get task by id
  // @route   GET /api/v1/tasks/:id
  // @access  Public
  getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      const task = await this.tasksServices.getTaskById(id);
      const response = new ApiResponse(httpStatusCodes.OK, "TASK FOUND", task);
      response.send(res)
    } catch (err: any) {
      returnError(err, next);
    }
  }

  // @desc    Update task by id
  // @route   PUT /api/v1/tasks/:id
  // @access  Public
  updateTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);
    const updates: Task = req.body;
    if(Object.keys(updates).length === 0){
      const err = new ApiError("update body can not be empty", httpStatusCodes.UNPROCESSABLE_ENTITY);
      returnError(err, next);
    }
    try {
      const updated = await this.tasksServices.updateTaskById(id, updates);
      const response = new ApiResponse(httpStatusCodes.OK, "TASK UPDATED", updated);
      response.send(res);
    } catch (err: any) {
      returnError(err, next);
    }
  }

  // @desc    Delete task by id
  // @route   DELETE /api/v1/tasks/:id
  // @access  Public
  deleteTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      const deleted = await this.tasksServices.deleteTaskById(id);
      const response = new ApiResponse(httpStatusCodes.OK, "TASK DELETED", deleted)
      response.send(res);
    } catch (err: any) {
      returnError(err, next);
    }
  }
}

export default TasksControllers;