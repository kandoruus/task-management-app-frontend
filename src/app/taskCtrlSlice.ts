import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { store, type RootState } from 'app/store';
import { Task, Tasklist } from 'app/types';
import axios from 'axios';
import {
  GET_ALL_TASKS_API,
  DELETE_ALL_TASKS_API,
  SAVE_ALL_TASKS_API,
  SAVE_TASK_HEADERS,
} from 'helper/constants';

export const fetchTasklist = createAsyncThunk(
  'tasklist/fetchTasklist',
  async () => {
    return (await axios.get(GET_ALL_TASKS_API)).data;
  }
);

export const deleteTasklist = createAsyncThunk(
  'tasklist/deleteTasklist',
  async () => {
    await axios.get(DELETE_ALL_TASKS_API);
  }
);

export const saveTasklist = createAsyncThunk(
  'tasklist/saveTasklist',
  async () => {
    try {
      const response = await axios.post(
        SAVE_ALL_TASKS_API,
        {
          tasklist: JSON.stringify(store.getState().taskCtrl.tasklist),
        },
        SAVE_TASK_HEADERS
      );
      if (response.data.message) {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  }
);

interface TaskCtrlState {
  tasklist: Tasklist;
  showEditor: boolean;
}

const initialState = {
  tasklist: [],
  showEditor: false,
} as TaskCtrlState;

export const taskCtrlSlice = createSlice({
  name: 'taskCtrl',
  initialState: initialState,
  reducers: {
    openEditor: (state) => {
      state.showEditor = true;
    },
    closeEditor: (state) => {
      state.showEditor = false;
    },
    saveNewTaskLocal: (state, action: PayloadAction<Task>) => {
      state.tasklist = [...state.tasklist, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasklist.fulfilled, (state, action) => {
      state.tasklist = action.payload as Tasklist;
    });
    builder.addCase(deleteTasklist.pending, (state) => {
      state.tasklist = [] as Tasklist;
    });
  },
});

export const { openEditor, closeEditor, saveNewTaskLocal } =
  taskCtrlSlice.actions;
export const selectTaskCtrl = (state: RootState) => state.taskCtrl;
export default taskCtrlSlice.reducer;
