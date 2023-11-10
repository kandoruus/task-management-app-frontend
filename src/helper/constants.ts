import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { tasklistSlice } from 'app/slices';
import { Task } from './../app/types';

//Action types
export const LOAD_TASKS = 'LOAD_TASKS';
export const DELETE_TASKS = 'DELETE_TASKS';
export const SAVE_TASKS = 'SAVE_TASKS';
export const CREATE_TASK = 'CREATE_TASK';

//Error messages

//API addresses
export const GET_ALL_TASKS_API = 'http://localhost:3001/api/tasklist';

//TODO label constant catagories

export const INIT_TASKLIST: Task[] = [];

export const tasklistCtrlBtns: {
  id: string;
  className: string;
  value: string;
  actionType: ActionCreatorWithoutPayload;
}[] = [
  {
    id: 'load-tl-btn',
    className: 'tl-control-btn',
    value: 'Load Tasks',
    actionType: tasklistSlice.actions.loadTasks,
  },
  {
    id: 'delete-tl-btn',
    className: 'tl-control-btn',
    value: 'Delete Tasks',
    actionType: tasklistSlice.actions.deleteAllTasks,
  },
  {
    id: 'save-tl-btn',
    className: 'tl-control-btn',
    value: 'Save Tasks',
    actionType: tasklistSlice.actions.saveTasks,
  },
  {
    id: 'new-task-tl-btn',
    className: 'tl-control-btn',
    value: 'Create Task',
    actionType: tasklistSlice.actions.createTask,
  },
];
