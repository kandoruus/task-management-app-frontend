import { SessionData, TaskData } from 'app/types';

//Error messages
export const ERR_MSG_BLANK_NAME = 'Task name cannot be blank';

//Popup messages
export const POP_MSG_QUERY_SAVE = 'Do you want to save your changes?';

//API addresses
export const TASKS_API = {
  GET_ALL: process.env.REACT_APP_GET_ALL_TASKS_API as string,
  DELETE_ALL: process.env.REACT_APP_DELETE_ALL_TASKS_API as string,
  SAVE_ALL: process.env.REACT_APP_SAVE_ALL_TASKS_API as string,
  SAVE_NEW: process.env.REACT_APP_SAVE_NEW_TASKS_API as string,
  DELETE_ONE: process.env.REACT_APP_DELETE_TASK_API as string,
  SAVE_ONE: process.env.REACT_APP_SAVE_ONE_TASK_API as string,
};

export const USER_API = {
  SIGNUP: process.env.REACT_APP_SIGNUP_USER_API as string,
  LOGIN: process.env.REACT_APP_LOGIN_USER_API as string,
  CHANGE_PASSWORD: process.env.REACT_APP_CHANGE_PASSWORD_USER_API as string,
  DELETE_ACCOUNT: process.env.REACT_APP_DELETE_ACCOUNT_USER_API as string,
};

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
