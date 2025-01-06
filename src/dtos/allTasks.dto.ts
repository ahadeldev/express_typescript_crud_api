import Task from "./task.dto"

interface AllTasks {
  tasks: Task[],
  totalTasks: number | null,
  totalPages: number,
  currentPage: number
}

export default AllTasks;