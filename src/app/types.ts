import React from 'react';

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

export type SessionData = { username: string; sessionCode: string };

export type AppFocusT =
  | 'AUTH_PAGE'
  | 'TASKS_PAGE'
  | 'TIMESHEET_PAGE'
  | 'ACCOUNT_PAGE'
  | 'ADMIN_PAGE'
  | 'SETTINGS_PAGE'
  | 'HOME_PAGE';

export type WelcomePageT = React.FC<{ sendAlert: (message: string) => void }>;
