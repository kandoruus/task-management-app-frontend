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

export type PasswordArgs = { oldPassword: string; newPassword: string };

export type AppFocusT =
  | '/task-management-app/welcome'
  | '/task-management-app/login'
  | '/task-management-app/signup'
  | '/task-management-app'
  | '/task-management-app/tasks'
  | '/task-management-app/timesheet'
  | '/task-management-app/account';

export type WelcomePageT = React.FC<{ sendAlert: (message: string) => void }>;
