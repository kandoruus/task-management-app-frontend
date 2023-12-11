import { AppFocusT } from 'app/types';
//Error messages
export const ERR_MSG = {
  BLANK_NAME: 'Task name cannot be blank',
  NOT_PWD_MATCH: 'The passwords do not match.',
  INPUT_IS_BLANK: 'Input is blank.',
  PWD_UPDATE_FAILED: 'ERROR: Password failed to update.',
};
//Popup messages
export const POP_MSG = {
  QUERY_SAVE: 'Do you want to save your changes?',
};

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
  LOGOUT: process.env.REACT_APP_LOGOUT_USER_API as string,
};

//cookies
export const COOKIES = {
  USERNAME: 'USERNAME_COOKIE',
  SESSIONCODE: 'SESSION_STATUS_COOKIE',
  LOGIN: 'LOGIN_COOKIE',
};

//routes
export const PAGES = {
  AUTH: '/task-management-app/welcome' as AppFocusT,
  WELCOME: '/task-management-app/welcome' as AppFocusT,
  LOGIN: '/task-management-app/login' as AppFocusT,
  SIGNUP: '/task-management-app/signup' as AppFocusT,
  HOME: '/task-management-app' as AppFocusT,
  TASKS: '/task-management-app/tasks' as AppFocusT,
  TIMESHEET: '/task-management-app/timesheet' as AppFocusT,
  ACCOUNT: '/task-management-app/account' as AppFocusT,
};

//misc
//  axios headers
export const AXIOS_HEADERS = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};
//  data for newly created task
export const NEW_TASK_DATA = {
  name: 'New Task',
  description: '',
  status: 'Not Started',
  priority: 'Low',
};
//  number of tasks displayed in the tasklist viewer
export const TASKS_PER_PAGE = 25;
//  session data when logged out
export const SESSION_LOGGED_OUT = {
  username: '',
  sessionCode: '',
};
