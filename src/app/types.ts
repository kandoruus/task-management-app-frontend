import {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material';
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
  id: string;
  punchIn: number;
  punchOut?: number;
  taskId: string;
  userId: string;
};

export type DBTimePunch = {
  _id: string;
  punchIn: string;
  punchOut?: string;
  taskId: string;
  userId: string;
};

export type ActivityData = {
  punchId: string;
  taskId: string;
};

export type DBData = {
  message: string;
};

export interface PunchInData extends DBData {
  id: string;
}

export interface PunchlistData extends DBData {
  punchlist: DBTimePunch[];
}

export type DBResponse<T extends DBData> = {
  status: 'error' | 'success';
  data: T;
};

export type TaskOption = {
  id: string;
  label: string;
};

export type TaskSelectorChangeHandler = (
  _: React.SyntheticEvent<Element, Event>,
  value: TaskOption | null,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<TaskOption> | undefined
) => void;

export type TimeInterval = {
  start: number;
  end: number;
};

export type TimesheetRowProps = {
  interval: TimeInterval;
  isHourlyView: boolean;
};
