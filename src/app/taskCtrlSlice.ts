import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { store, type RootState, AppDispatch } from 'app/store';
import { Task, Tasklist, TaskDataWIdx } from 'app/types';
import axios from 'axios';
import {
  GET_ALL_TASKS_API,
  DELETE_ALL_TASKS_API,
  SAVE_ALL_TASKS_API,
  SAVE_TASK_HEADERS,
  SAVE_NEW_TASKS_API,
  NEW_TASK_DATA,
  DELETE_TASK_API,
} from 'helper/constants';

const sliceName = 'taskCtrl';

export const fetchTasklist = createAsyncThunk(
  sliceName + '/fetchTasklist',
  async () => {
    return (await axios.get(GET_ALL_TASKS_API)).data;
  }
);

export const deleteTasklist = createAsyncThunk(
  sliceName + '/deleteTasklist',
  async () => {
    await axios.get(DELETE_ALL_TASKS_API);
  }
);

export const saveTasklist = createAsyncThunk(
  sliceName + '/saveTasklist',
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

export const createNewTask = createAsyncThunk(
  sliceName + '/createNewTask',
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        SAVE_NEW_TASKS_API,
        NEW_TASK_DATA,
        SAVE_TASK_HEADERS
      );
      if (response.data.id) {
        dispatch(
          addTaskToList({
            _id: response.data.id,
            data: { ...NEW_TASK_DATA },
            __v: 0,
          })
        );
      } else {
        throw new Error('No id returned from Database');
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteTask = createAsyncThunk(
  sliceName + 'deleteTask',
  async (index: number) => {
    const taskToDelete = store.getState().taskCtrl.tasklist[index];
    try {
      if (taskToDelete !== undefined) {
        await axios.get(DELETE_TASK_API + taskToDelete._id);
        return index;
      } else {
        throw new Error('Index: ' + index + ' has no valid task');
      }
    } catch (e) {
      console.error(e);
      return index;
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
  name: sliceName,
  initialState: initialState,
  reducers: {
    openEditor: (state) => {
      state.showEditor = true;
    },
    closeEditor: (state) => {
      state.showEditor = false;
    },
    addTaskToList: (state, action: PayloadAction<Task>) => {
      state.tasklist = [...state.tasklist, action.payload];
    },
    updateTaskData: (state, action: PayloadAction<TaskDataWIdx>) => {
      state.tasklist[action.payload.indx].data = { ...action.payload.data };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasklist.fulfilled,
      (state, action: PayloadAction<Tasklist>) => {
        state.tasklist = action.payload as Tasklist;
      }
    );
    builder.addCase(deleteTasklist.pending, (state) => {
      state.tasklist = [] as Tasklist;
    });
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<number>) => {
        const taskToDelete = state.tasklist[action.payload];
        if (taskToDelete !== undefined) {
          state.tasklist = [
            ...state.tasklist.slice(0, action.payload),
            ...state.tasklist.slice(action.payload + 1),
          ];
        } else {
          console.error('Task deletion failed');
        }
      }
    );
  },
});

export const { openEditor, closeEditor, addTaskToList } = taskCtrlSlice.actions;
export const selectTaskCtrl = (state: RootState) => state.taskCtrl;
export default taskCtrlSlice.reducer;
