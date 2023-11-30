export type TaskData = {
  name: string;
  description: string;
  status: string;
  priority: string;
};

export type TaskDataWIdx = {
  data: TaskData;
  indx: number;
};

export type Task = {
  _id: string;
  data: TaskData;
  __v: number;
};

export type Tasklist = Task[];

export type AppFocusT =
  | 'TASKS_PAGE'
  | 'TIMESHEET_PAGE'
  | 'ACCOUNT_PAGE'
  | 'ADMIN_PAGE'
  | 'SETTINGS_PAGE'
  | 'HOME_PAGE';
