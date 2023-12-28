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

export type SessionData = {
  username: string;
  sessionCode: string;
  userId: string;
};

export type PasswordArgs = { oldPassword: string; newPassword: string };

export type AppFocusT =
  | '/welcome'
  | '/login'
  | '/signup'
  | '/'
  | '/tasks'
  | '/timesheet'
  | '/account';

export type WelcomePageT = React.FC<{ sendAlert: (message: string) => void }>;

export type TimePunch = {
  punchIn: number;
  punchOut?: number;
  taskId: string;
  userId: string;
};
