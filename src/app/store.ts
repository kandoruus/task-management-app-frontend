import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';

export const store = configureStore({
  reducer: {
    taskCtrl: taskCtrlSlice.reducer,
    taskEditor: taskEditorSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
