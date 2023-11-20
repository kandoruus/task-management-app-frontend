export const tasklistCtrlBtns: {
  id: string;
  className: string;
  value: string;
  handleClickIdx: number;
}[] = [
  {
    id: 'load-tl-btn',
    className: 'tl-control-btn',
    value: 'Load Tasks',
    handleClickIdx: 0,
  },
  {
    id: 'delete-tl-btn',
    className: 'tl-control-btn',
    value: 'Delete Tasks',
    handleClickIdx: 1,
  },
  {
    id: 'save-tl-btn',
    className: 'tl-control-btn',
    value: 'Save Tasks',
    handleClickIdx: 2,
  },
  {
    id: 'new-task-tl-btn',
    className: 'tl-control-btn',
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
