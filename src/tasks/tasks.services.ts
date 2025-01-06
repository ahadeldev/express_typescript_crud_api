import pool from "../config/db.config";
import Task from "../dtos/task.dto";
import AllTasks from "../dtos/allTasks.dto";
import ApiError from "../shared/api.error";
import httpStatusCodes from "../shared/http.status.codes";

class TasksServices {
  // Create task handler
  async createTask(task: Task){
    const created = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [task.title, task.description, task.status]
    );
    if(!created){
      throw new ApiError("error creating task", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    return created.rows[0]
  }

  // Get all tasks handler
  async getAllTasks(pageNum: number){
    const limit: number = 5;
    const offset: number = (pageNum - 1) * limit;
    const tasks = await pool.query("SELECT * FROM tasks LIMIT $1 OFFSET $2", [limit, offset]);
    if(!tasks){
      throw new ApiError("error getting tasks", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    if (tasks.rows.length === 0) {
      throw new ApiError("No tasks found", httpStatusCodes.NOT_FOUND);
    }

    const totalTasksCount = await pool.query("SELECT COUNT(*) AS total_tasks FROM tasks");
    const totalTasks = parseInt(totalTasksCount.rows[0].total_tasks, 10) || 0;
    const totalPages = Math.ceil(totalTasks / limit);

    const allTasks: AllTasks = {
      tasks: tasks.rows,
      totalTasks: totalTasks,
      totalPages: totalPages,
      currentPage: pageNum
    }
    return allTasks;
  }

  // Get task by id handler
  async getTaskById(id: number){
    const task = await pool.query(
      "SELECT * FROM tasks WHERE id = $1", [id]
    );
    if(!task || task.rows.length === 0) {
      throw new ApiError("task not found", httpStatusCodes.NOT_FOUND);
    }
    return task.rows[0];
  }

  // Update task by id handler
  async updateTaskById(id: number, updates: Task){
    const taskFound = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if(!taskFound || taskFound.rows.length === 0) {
      throw new ApiError("task not found", httpStatusCodes.NOT_FOUND);
    }
    const task: Task = taskFound.rows[0];
    const newTitle = updates.title || task.title;
    const newDescription = updates.description || task.description;
    const newStatus = updates.status || task.status;

    const updatedTask = await pool.query(
      `UPDATE tasks SET 
      title = $1,
      description = $2,
      status = $3,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
      `,
      [newTitle, newDescription, newStatus, id]
    );

    if(!updatedTask){
      throw new ApiError("error updating task", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    return updatedTask.rows[0];
  }

  // Delete task by id handler
  async deleteTaskById(id: number){
    const task = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
    if(task.rows.length === 0){
      throw new ApiError("task not found", httpStatusCodes.NOT_FOUND);
    }
    return task.rows[0];
  }
}

export default TasksServices;