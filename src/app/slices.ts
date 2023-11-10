import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { Tasklist } from 'app/types';

const initialTasklistState: Tasklist = [];

export const tasklistSlice = createSlice({
  name: 'tasklist',
  initialState: initialTasklistState,
  reducers: {
    loadTasks: (state) => {
      console.log('loadTasks');
      return state;
    },
    deleteAllTasks: (state) => {
      console.log('deleteAllTasks');
      return state;
    },
    saveTasks: (state) => {
      console.log('saveTasks');
      return state;
    },
    createTask: (state) => {
      console.log('createTask');
      return state;
    },
  },
});

export const { loadTasks, deleteAllTasks, saveTasks, createTask } =
  tasklistSlice.actions;
export const selectTasklist = (state: RootState) => state.tasklist;
export default tasklistSlice.reducer;
