import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from 'app/store';
import { Task, Tasklist, TaskDataWIdx } from 'app/types';
import axios from 'axios';
import {
  GET_ALL_TASKS_API,
  DELETE_ALL_TASKS_API,
  SAVE_TASK_HEADERS,
  SAVE_NEW_TASKS_API,
  NEW_TASK_DATA,
  DELETE_TASK_API,
  SAVE_ONE_TASK_API,
  TASKS_PER_PAGE,
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

export const createNewTask = createAsyncThunk(
  sliceName + '/createNewTask',
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        SAVE_NEW_TASKS_API,
        { data: JSON.stringify(NEW_TASK_DATA) },
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

export const saveOneTask = createAsyncThunk(
  sliceName + '/saveOneTask',
  async (task: Task) => {
    try {
      const response = await axios.post(
        SAVE_ONE_TASK_API,
        {
          _id: task._id,
          data: JSON.stringify(task.data),
        },
        SAVE_TASK_HEADERS
      );
      if (response.data.error) {
        throw new Error(response.data.error);
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteTask = createAsyncThunk(
  sliceName + 'deleteTask',
  async (params: { index: number; taskId: string }) => {
    try {
      await axios.get(DELETE_TASK_API + params.taskId);
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

const initialState = {
  tasklist: [],
  showEditor: false,
  page: 1,
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
