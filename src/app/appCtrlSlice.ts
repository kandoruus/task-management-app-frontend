import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AppFocusT } from 'app/types';
import {
  ACCOUNT_PAGE,
  ADMIN_PAGE,
  SETTINGS_PAGE,
  TASKS_PAGE,
  TIMESHEET_PAGE,
  HOME_PAGE,
} from 'helper/constants';

const sliceName = 'appCtrl';

interface AppCtrlState {
  appFocus: AppFocusT;
}

export const initialAppCtrlState = {
  appFocus: HOME_PAGE,
} as AppCtrlState;

export const appCtrlSlice = createSlice({
  name: sliceName,
  initialState: initialAppCtrlState,
  reducers: {
    focusHome: (state) => {
      state.appFocus = HOME_PAGE;
    },
    focusTasks: (state) => {
      state.appFocus = TASKS_PAGE;
    },
    focusTimesheet: (state) => {
      state.appFocus = TIMESHEET_PAGE;
    },
    focusAccount: (state) => {
      state.appFocus = ACCOUNT_PAGE;
    },
    focusAdmin: (state) => {
      state.appFocus = ADMIN_PAGE;
    },
    focusSettings: (state) => {
      state.appFocus = SETTINGS_PAGE;
    },
  },
});

export const {
  focusHome,
  focusTasks,
  focusTimesheet,
  focusAccount,
  focusAdmin,
  focusSettings,
} = appCtrlSlice.actions;
export const selectAppCtrl = (state: RootState) => state.appCtrl;
export default appCtrlSlice.reducer;
