import { appCtrlSlice } from './slices/appCtrlSlice';
import {
  Action,
  configureStore,
  ThunkAction,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import { punchCtrlSlice } from 'app/slices/punchCtrlSlice';
import { taskCtrlSlice } from 'app/slices/taskCtrlSlice';
import { taskEditorSlice } from 'app/slices/taskEditorSlice';

const rootReducer = combineReducers({
  appCtrl: appCtrlSlice.reducer,
  taskCtrl: taskCtrlSlice.reducer,
  taskEditor: taskEditorSlice.reducer,
  punchCtrl: punchCtrlSlice.reducer,
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
