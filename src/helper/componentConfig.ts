export const tasklistCtrlBtns: {
  id: string;
  value: string;
  handleClickIdx: number;
}[] = [
  {
    id: 'load-tl-btn',
    value: 'Load Tasks',
    handleClickIdx: 0,
  },
  {
    id: 'delete-tl-btn',
    value: 'Delete Tasks',
    handleClickIdx: 1,
  },
  {
    id: 'save-tl-btn',
    value: 'Save Tasks',
    handleClickIdx: 2,
  },
  {
    id: 'new-task-tl-btn',
    value: 'Create Task',
    handleClickIdx: 3,
  },
];

export const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
export const statusOptions = [
  'Not Started',
  'In Progress',
  'Roadblocked',
  'Completed',
];
