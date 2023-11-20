import {
  Action,
  configureStore,
  ThunkAction,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';

const rootReducer = combineReducers({
  taskCtrl: taskCtrlSlice.reducer,
  taskEditor: taskEditorSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
