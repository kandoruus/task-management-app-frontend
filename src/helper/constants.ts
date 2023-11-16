import { TaskData } from 'app/types';

//Error messages

//API addresses
export const GET_ALL_TASKS_API = 'http://localhost:3001/api/tasklist';
export const DELETE_ALL_TASKS_API = 'http://localhost:3001/api/cleartasks';
export const SAVE_ALL_TASKS_API = 'http://localhost:3001/api/updatemanytasks';
export const SAVE_NEW_TASKS_API = 'http://localhost:3001/api/task';
export const DELETE_TASK_API = 'http://localhost:3001/api/removetask/';
export const SAVE_ONE_TASK_API = 'http://localhost:3001/api/updatetask';

//axios headers
export const SAVE_TASK_HEADERS = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

//TODO label constant catagories
export const NEW_TASK_DATA: TaskData = {
  name: 'New Task',
  description: '',
  status: '',
  priority: '',
};
export const TASKS_PER_PAGE = 25;
