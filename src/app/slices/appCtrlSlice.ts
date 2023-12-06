import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AppFocusT, SessionData } from 'app/types';
import {
  ACCOUNT_PAGE,
  ADMIN_PAGE,
  SETTINGS_PAGE,
  TASKS_PAGE,
  TIMESHEET_PAGE,
  HOME_PAGE,
  AUTH_PAGE,
  SESSION_LOGGED_OUT,
} from 'helper/constants';

const sliceName = 'appCtrl';

interface AppCtrlState {
  appFocus: AppFocusT;
  sessionData: SessionData;
}

const sessionCode = [
  'e79b2fe736f0c79803809cdfe65a755f',
  'f79b2fe736f0c79803809cdfe65a755e',
];

export const testTasksState = {
  appFocus: ACCOUNT_PAGE,
  sessionData: {
    username: 'kandoruus',
    sessionCode: sessionCode[1],
  },
} as AppCtrlState;

export const initialAppCtrlState = {
  appFocus: AUTH_PAGE,
  sessionData: SESSION_LOGGED_OUT,
} as AppCtrlState;

export const appCtrlSlice = createSlice({
  name: sliceName,
  initialState: testTasksState,
  reducers: {
    focusAuth: (state) => {
      state.appFocus = AUTH_PAGE;
    },
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
    login: (state, action: PayloadAction<SessionData>) => {
      state.sessionData = action.payload;
      state.appFocus = HOME_PAGE;
    },
    logout: (state) => {
      //TODO, axios post loggout thunk
      state.sessionData = SESSION_LOGGED_OUT;
      state.appFocus = AUTH_PAGE;
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
