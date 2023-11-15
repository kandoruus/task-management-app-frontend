import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState, store } from 'app/store';
import axios from 'axios';
import { SAVE_NEW_TASKS_API, SAVE_TASK_HEADERS } from 'helper/constants';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { Task } from 'app/types';

export const saveNewTask = createAsyncThunk(
  'tasklist/saveNewTask',
  async (dispatch: AppDispatch) => {
    try {
      const newTask = store.getState().taskEditor;
      const response = await axios.post(
        SAVE_NEW_TASKS_API,
        newTask.data,
        SAVE_TASK_HEADERS
      );
      if (response.data.id) {
        dispatch(
          taskCtrlSlice.actions.saveNewTaskLocal({
            _id: response.data.id,
            data: newTask.data,
            __v: newTask.__v,
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

const initialState = {
  _id: '',
  data: { name: 'New Task', description: '', status: '', priority: '' },
  __v: 0,
} as Task;

export const taskEditorSlice = createSlice({
  name: 'taskEditor',
  initialState: initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      state.data.status = action.payload;
    },
    updatePriority: (state, action: PayloadAction<string>) => {
      state.data.priority = action.payload;
    },
    updateId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveNewTask.fulfilled, (state) => {
      state._id = initialState._id;
      state.data = initialState.data;
      state.__v = initialState.__v;
    });
  },
});

export const {
  updateName,
  updateDescription,
  updateStatus,
  updatePriority,
  updateId,
} = taskEditorSlice.actions;
export const selectTaskEditor = (state: RootState) => state.taskEditor;
export default taskEditorSlice.reducer;
