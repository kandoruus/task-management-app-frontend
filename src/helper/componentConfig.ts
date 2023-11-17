import { AppDispatch, store } from 'app/store';
import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  openEditor,
  saveTasklist,
} from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';

export type ctrlBtnClick = (dispatch: AppDispatch) => void;

export const tasklistCtrlBtns: {
  id: string;
  className: string;
  value: string;
  onClick: ctrlBtnClick;
}[] = [
  {
    id: 'load-tl-btn',
    className: 'tl-control-btn',
    value: 'Load Tasks',
    onClick: (dispatch: AppDispatch) => {
      dispatch(fetchTasklist());
    },
  },
  {
    id: 'delete-tl-btn',
    className: 'tl-control-btn',
    value: 'Delete Tasks',
    onClick: (dispatch: AppDispatch) => {
      dispatch(deleteTasklist());
    },
  },
  {
    id: 'save-tl-btn',
    className: 'tl-control-btn',
    value: 'Save Tasks',
    onClick: (dispatch: AppDispatch) => {
      dispatch(saveTasklist());
    },
  },
  {
    id: 'new-task-tl-btn',
    className: 'tl-control-btn',
    value: 'Create Task',
    onClick: (dispatch: AppDispatch) => {
      dispatch(createNewTask(dispatch)).then(() => {
        const indx = store.getState().taskCtrl.tasklist.length - 1;
        const data = store.getState().taskCtrl.tasklist[indx].data;
        dispatch(loadTaskData({ data, indx }));
        dispatch(openEditor());
      });
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
