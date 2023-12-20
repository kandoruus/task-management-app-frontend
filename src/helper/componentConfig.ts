import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  saveTasklist,
} from 'app/slices/taskCtrlSlice';
import { ActionCreator } from 'redux';

export type MenuButtonConfig = {
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: ActionCreator<any>;
};

export const tasklistCtrlBtns: MenuButtonConfig[] = [
  {
    id: 'load-tl-btn',
    value: 'Load Tasks',
    action: fetchTasklist,
  },
  {
    id: 'delete-tl-btn',
    value: 'Delete Tasks',
    action: deleteTasklist,
  },
  {
    id: 'save-tl-btn',
    value: 'Save Tasks',
    action: saveTasklist,
  },
  {
    id: 'new-task-tl-btn',
    value: 'Create Task',
    action: createNewTask,
  },
];

export const timesheetCtrlBtns: MenuButtonConfig[] = [
  {
    id: 'view-week-btn',
    value: 'Weekly',
    action: () => {
      console.log('Weekly');
    },
  },
  {
    id: 'view-month-btn',
    value: 'Monthly',
    action: () => {
      console.log('Monthly');
    },
  },
  {
    id: 'set-view-btn',
    value: 'Custom',
    action: () => {
      console.log('Custom');
    },
  },
];

export const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
export const statusOptions = [
  'Not Started',
  'In Progress',
  'Roadblocked',
  'Completed',
];
