import {
  deleteTasklist,
  fetchTasklist,
  saveTasklist,
  taskCtrlSlice,
} from 'app/taskCtrlSlice';

export type ctrlBtnClick =
  | typeof fetchTasklist
  | typeof deleteTasklist
  | typeof saveTasklist
  | typeof taskCtrlSlice.actions.openEditor;

export const tasklistCtrlBtns: {
  id: string;
  className: string;
  value: string;
  actionType: ctrlBtnClick;
}[] = [
  {
    id: 'load-tl-btn',
    className: 'tl-control-btn',
    value: 'Load Tasks',
    actionType: fetchTasklist,
  },
  {
    id: 'delete-tl-btn',
    className: 'tl-control-btn',
    value: 'Delete Tasks',
    actionType: deleteTasklist,
    //actionType: tasklistSlice.actions.deleteAllTasks,
  },
  {
    id: 'save-tl-btn',
    className: 'tl-control-btn',
    value: 'Save Tasks',
    actionType: saveTasklist,
    //actionType: tasklistSlice.actions.saveTasks,
  },
  {
    id: 'new-task-tl-btn',
    className: 'tl-control-btn',
    value: 'Create Task',
    actionType: taskCtrlSlice.actions.openEditor,
  },
];
