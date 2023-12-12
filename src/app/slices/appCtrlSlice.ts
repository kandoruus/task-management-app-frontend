import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AppFocusT, PasswordArgs, SessionData } from 'app/types';
import axios from 'axios';
import {
  PAGES,
  SESSION_LOGGED_OUT,
  AXIOS_HEADERS,
  USER_API,
} from 'helper/constants';

const sliceName = 'appCtrl';

export const postToDB = createAsyncThunk(
  sliceName + '/postToDB',
  async (args: { url: string; postPayload: object }, thunkAPI) => {
    try {
      return {
        status: 'success',
        message: (
          await axios.post(
            args.url,
            {
              ...args.postPayload,
              ...selectAppCtrl(thunkAPI.getState() as RootState).sessionData,
            },
            AXIOS_HEADERS
          )
        ).data.message,
      };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return { message: e.response.data.message, status: 'error' };
      } else {
        console.error(e);
        return undefined;
      }
    }
  }
);

export const login = createAsyncThunk(
  sliceName + '/login',
  async (credentials: { username: string; password: string }) => {
    try {
      return {
        status: 'success',
        data: (await axios.post(USER_API.LOGIN, credentials, AXIOS_HEADERS))
          .data,
      };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return {
          data: {
            message: e.response.data.message,
            username: '',
            sessionCode: '',
          },
          status: 'error',
        };
      } else {
        console.error(e);
        return undefined;
      }
    }
  }
);

export const signup = createAsyncThunk(
  sliceName + '/signup',
  async (credentials: { username: string; password: string }) => {
    try {
      return {
        status: 'success',
        message: (await axios.post(USER_API.SIGNUP, credentials, AXIOS_HEADERS))
          .data.message,
      };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return {
          message: e.response.data.message,
          status: 'error',
        };
      } else {
        console.error(e);
        return undefined;
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  sliceName + '/changePassword',
  async ({ oldPassword, newPassword }: PasswordArgs, thunkAPI) => {
    return (
      await thunkAPI.dispatch(
        postToDB({
          url: USER_API.CHANGE_PASSWORD,
          postPayload: { oldPassword: oldPassword, newPassword: newPassword },
        })
      )
    ).payload;
  }
);

export const deleteAccount = createAsyncThunk(
  sliceName + '/deleteAccount',
  async ({ password }: { password: string }, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      postToDB({
        url: USER_API.DELETE_ACCOUNT,
        postPayload: { password: password },
      })
    );
    console.log(res);
    const payload = res.payload as
      | { message: string; status: string }
      | undefined;
    if (payload !== undefined && payload.status === 'success') {
      thunkAPI.dispatch(logout.fulfilled);
    }
    return payload;
  }
);

export const logout = createAsyncThunk(
  sliceName + '/logout',
  async (_, thunkAPI) => {
    return (
      await thunkAPI.dispatch(
        postToDB({
          url: USER_API.LOGOUT,
          postPayload: {},
        })
      )
    ).payload;
  }
);

interface AppCtrlState {
  appFocus: AppFocusT;
  sessionData: SessionData;
}

export const initialAppCtrlState = {
  appFocus: PAGES.AUTH,
  sessionData: SESSION_LOGGED_OUT,
} as AppCtrlState;

export const appCtrlSlice = createSlice({
  name: sliceName,
  initialState: initialAppCtrlState,
  reducers: {
    focusAuth: (state) => {
      state.appFocus = PAGES.AUTH;
    },
    focusHome: (state) => {
      state.appFocus = PAGES.HOME;
    },
    focusTasks: (state) => {
      state.appFocus = PAGES.TASKS;
    },
    focusTimesheet: (state) => {
      state.appFocus = PAGES.TIMESHEET;
    },
    focusAccount: (state) => {
      state.appFocus = PAGES.ACCOUNT;
    },
    login: (state, action: PayloadAction<SessionData>) => {
      state.sessionData = action.payload;
      state.appFocus = PAGES.HOME;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.sessionData = SESSION_LOGGED_OUT;
      state.appFocus = PAGES.AUTH;
    });
  },
});

export const selectAppCtrl = (state: RootState) => state.appCtrl;
export default appCtrlSlice.reducer;
