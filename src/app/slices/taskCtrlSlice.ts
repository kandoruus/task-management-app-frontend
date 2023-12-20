import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { selectAppCtrl } from 'app/slices/appCtrlSlice';
import { loadTaskData } from 'app/slices/taskEditorSlice';
import { RootState } from 'app/store';
import { Task, Tasklist, TaskDataWIdx } from 'app/types';
import axios from 'axios';
import {
  AXIOS_HEADERS,
  NEW_TASK_DATA,
  TASKS_PER_PAGE,
  TASKS_API,
} from 'helper/constants';
import { createAppAsyncThunk } from 'helper/functions';

const sliceName = 'taskCtrl';

export const fetchTasklist = createAppAsyncThunk(
  sliceName + '/fetchTasklist',
  async (_, thunkAPI) => {
    return (
      await axios.post(
        TASKS_API.GET_ALL,
        { ...selectAppCtrl(thunkAPI.getState()).sessionData },
        AXIOS_HEADERS
      )
    ).data;
  }
);

export const deleteTasklist = createAppAsyncThunk(
  sliceName + '/deleteTasklist',
  async (_, thunkAPI) => {
    await axios.post(
      TASKS_API.DELETE_ALL,
      { ...selectAppCtrl(thunkAPI.getState()).sessionData },
      AXIOS_HEADERS
    );
  }
);

export const saveTasklist = createAppAsyncThunk(
  sliceName + '/saveTasklist',
  async (_, thunkAPI) => {
    await axios.post(
      TASKS_API.SAVE_ALL,
      {
        tasklist: JSON.stringify(selectTaskCtrl(thunkAPI.getState()).tasklist),
        ...selectAppCtrl(thunkAPI.getState()).sessionData,
      },
      AXIOS_HEADERS
    );
  }
);

export const createNewTask = createAppAsyncThunk(
  sliceName + '/createNewTask',
  async (_, thunkAPI) => {
    const response = await axios.post(
      TASKS_API.SAVE_NEW,
      {
        data: JSON.stringify(NEW_TASK_DATA),
        ...selectAppCtrl(thunkAPI.getState()).sessionData,
      },
      AXIOS_HEADERS
    );
    if (response.data.id) {
      const indexOfNewTask = selectTaskCtrl(thunkAPI.getState()).tasklist
        .length;
      thunkAPI.dispatch(
        addTaskToList({
          _id: response.data.id,
          data: { ...NEW_TASK_DATA },
          __v: 0,
        })
      );
      thunkAPI.dispatch(
        loadTaskData({
          data: { ...NEW_TASK_DATA },
          indx: indexOfNewTask,
        })
      );
      thunkAPI.dispatch(openEditor());
    } else {
      throw new Error('No id returned from Database');
    }
  }
);

export const saveOneTask = createAppAsyncThunk(
  sliceName + '/saveOneTask',
  async (task: Task, thunkAPI) => {
    const response = await axios.post(
      TASKS_API.SAVE_ONE,
      {
        _id: task._id,
        data: JSON.stringify(task.data),
        ...selectAppCtrl(thunkAPI.getState()).sessionData,
      },
      AXIOS_HEADERS
    );
    if (response.data.error) {
      throw new Error(response.data.error);
    }
  }
);

export const deleteTask = createAppAsyncThunk(
  sliceName + 'deleteTask',
  async (params: { index: number; taskId: string }, thunkAPI) => {
    try {
      await axios.post(
        TASKS_API.DELETE_ONE + params.taskId,
        { ...selectAppCtrl(thunkAPI.getState()).sessionData },
        AXIOS_HEADERS
      );
      return params.index;
    } catch (e) {
      console.error(e);
      return params.index;
    }
  }
);

interface TaskCtrlState {
  tasklist: Tasklist;
  showEditor: boolean;
  page: number;
}

export const initialTaskCtrlState = {
  tasklist: [],
  showEditor: false,
  page: 1,
} as TaskCtrlState;

export const taskCtrlSlice = createSlice({
  name: sliceName,
  initialState: initialTaskCtrlState,
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
    nextPage: (state) => {
      state.page = Math.min(
        state.page + 1,
        Math.max(Math.ceil(state.tasklist.length / TASKS_PER_PAGE), 1)
      );
    },
    prevPage: (state) => {
      state.page = Math.max(state.page - 1, 1);
    },
    firstPage: (state) => {
      state.page = 1;
    },
    lastPage: (state) => {
      state.page = Math.max(
        Math.ceil(state.tasklist.length / TASKS_PER_PAGE),
        1
      );
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
      state.page = 1;
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
          state.page = Math.min(
            state.page,
            Math.max(Math.ceil(state.tasklist.length / TASKS_PER_PAGE), 1)
          );
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
