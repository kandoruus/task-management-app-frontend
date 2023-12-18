import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  saveTasklist,
} from 'app/slices/taskCtrlSlice';

//Talk to Mike about the right way to do this, feels hacked this way
export type AsyncThunkT = typeof fetchTasklist;

export const tasklistCtrlBtns: {
  id: string;
  value: string;
  action: AsyncThunkT;
}[] = [
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

export const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
export const statusOptions = [
  'Not Started',
  'In Progress',
  'Roadblocked',
  'Completed',
];
