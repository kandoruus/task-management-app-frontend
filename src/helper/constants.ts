import { AppFocusT } from 'app/types';
import { Duration, FormatDurationOptions } from 'date-fns';
//Error messages
export const ERR_MSG = {
  BLANK_NAME: 'Task name cannot be blank',
  NOT_PWD_MATCH: 'The passwords do not match.',
  INPUT_IS_BLANK: 'Input is blank.',
  PWD_UPDATE_FAILED: 'SERVER ERROR: Password failed to update.',
  DELETE_ACC_FAILED: 'SERVER ERROR: Account failed to delete.',
  LOGIN_FAILED: 'SERVER ERROR: Login attempt failed.',
  SIGNUP_FAILED: 'SERVER ERROR: Failed to create new account.',
};
//Popup messages
export const POP_MSG = {
  QUERY_SAVE: 'Do you want to save your changes?',
};

//API addresses
const taskApiRoot = process.env.REACT_APP_TASK_API as string;
export const TASKS_API = {
  GET_ALL: taskApiRoot + '/tasklist',
  DELETE_ALL: taskApiRoot + '/cleartasks',
  SAVE_ALL: taskApiRoot + '/updatemanytasks',
  SAVE_NEW: taskApiRoot + '/task',
  DELETE_ONE: taskApiRoot + '/removetask',
  SAVE_ONE: taskApiRoot + '/updatetask',
};
const userApiRoot = process.env.REACT_APP_USER_API as string;
export const USER_API = {
  SIGNUP: userApiRoot + '/signup',
  LOGIN: userApiRoot + '/login',
  CHANGE_PASSWORD: userApiRoot + '/change-password',
  DELETE_ACCOUNT: userApiRoot + '/delete-account',
  LOGOUT: userApiRoot + '/logout',
};

//cookies
export const COOKIES = {
  USERNAME: 'USERNAME_COOKIE',
  SESSIONCODE: 'SESSION_STATUS_COOKIE',
  LOGIN: 'LOGIN_COOKIE',
};

//routes
export const PAGES = {
  AUTH: '/welcome' as AppFocusT,
  WELCOME: '/welcome' as AppFocusT,
  LOGIN: '/login' as AppFocusT,
  SIGNUP: '/signup' as AppFocusT,
  HOME: '/' as AppFocusT,
  TASKS: '/tasks' as AppFocusT,
  TIMESHEET: '/timesheet' as AppFocusT,
  ACCOUNT: '/account' as AppFocusT,
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

//zeroed duration object
export const zeroDuration: Duration = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};
//format options for duration outputs, ref: https://stackoverflow.com/a/65711327
export const durationFormatOptions: FormatDurationOptions = {
  format: ['hours', 'minutes'],
  zero: true,
  delimiter: ':',
  locale: {
    formatDistance: (_token, count) => String(count).padStart(2, '0'),
  },
};
