import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { NEW_TASK_DATA } from 'helper/constants';
import { TaskData, TaskDataWIdx } from 'app/types';

const sliceName = 'taskEditor';

interface TaskEditorState {
  data: TaskData;
  indexOfFocus: number | null;
}

const initialState = {
  data: { ...NEW_TASK_DATA },
  indexOfFocus: null,
} as TaskEditorState;

export const taskEditorSlice = createSlice({
  name: sliceName,
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
    loadTaskData: (state, action: PayloadAction<TaskDataWIdx>) => {
      state.data = { ...action.payload.data };
      state.indexOfFocus = action.payload.indx;
    },
    clearTaskData: (state) => {
      state.data = { ...NEW_TASK_DATA };
      state.indexOfFocus = null;
    },
  },
});

export const {
  updateName,
  updateDescription,
  updateStatus,
  updatePriority,
  loadTaskData,
  clearTaskData,
} = taskEditorSlice.actions;
export const selectTaskEditor = (state: RootState) => state.taskEditor;
export default taskEditorSlice.reducer;
