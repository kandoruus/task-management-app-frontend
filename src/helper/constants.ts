import { SessionData, TaskData } from 'app/types';

//Error messages
export const ERR_MSG_BLANK_NAME = 'Task name cannot be blank';

//Popup messages
export const POP_MSG_QUERY_SAVE = 'Do you want to save your changes?';

//API addresses
export const GET_ALL_TASKS_API = 'http://localhost:3001/task-api/tasklist';
export const DELETE_ALL_TASKS_API = 'http://localhost:3001/task-api/cleartasks';
export const SAVE_ALL_TASKS_API =
  'http://localhost:3001/task-api/updatemanytasks';
export const SAVE_NEW_TASKS_API = 'http://localhost:3001/task-api/task';
export const DELETE_TASK_API = 'http://localhost:3001/task-api/removetask/';
export const SAVE_ONE_TASK_API = 'http://localhost:3001/task-api/updatetask';
export const SIGNUP_USER_API = 'http://localhost:3001/user-api/signup';
export const LOGIN_USER_API = 'http://localhost:3001/user-api/login';
export const CHANGE_PASSWORD_USER_API =
  'http://localhost:3001/user-api/change-password';
export const DELETE_ACCOUNT_USER_API =
  'http://localhost:3001/user-api/delete-account';

//axios headers
export const AXIOS_HEADERS = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

//TODO label constant catagories
export const NEW_TASK_DATA: TaskData = {
  name: 'New Task',
  description: '',
  status: 'Not Started',
  priority: 'Low',
};
export const TASKS_PER_PAGE = 25;

//app focuses
export const AUTH_PAGE = 'AUTH_PAGE';
export const HOME_PAGE = 'HOME_PAGE';
export const TASKS_PAGE = 'TASKS_PAGE';
export const TIMESHEET_PAGE = 'TIMESHEET_PAGE';
export const ACCOUNT_PAGE = 'ACCOUNT_PAGE';
export const ADMIN_PAGE = 'ADMIN_PAGE';
export const SETTINGS_PAGE = 'SETTINGS_PAGE';

//Empty Session Data
export const SESSION_LOGGED_OUT: SessionData = {
  username: '',
  sessionCode: '',
};

//cookies
export const USERNAME_COOKIE = 'USERNAME_COOKIE';
export const SESSIONCODE_COOKIE = 'SESSION_STATUS_COOKIE';
export const LOGIN_COOKIE = 'LOGIN_COOKIE';

//login statuses
export const LOGGED_IN_STATUS = 'LOGGED_IN_STATUS';
export const LOGGED_OUT_STATUS = 'LOGGED_OUT_STATUS';

//routes
export const WELCOME_ROUTE = '/task-management-app/welcome';
export const LOGIN_ROUTE = '/task-management-app/login';
export const SIGNUP_ROUTE = '/task-management-app/signup';
export const HOME_ROUTE = '/task-management-app';
export const TASKS_ROUTE = '/task-management-app/tasks';
export const TIMESHEET_ROUTE = '/task-management-app/timesheet';
export const ACCOUNT_ROUTE = '/task-management-app/account';
