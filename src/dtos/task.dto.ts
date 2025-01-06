
interface Task {
  id?: number;
  title: string;
  description: string;
  status: string,
  created_at: Date,
  updated_at: Date
}

export default Task;