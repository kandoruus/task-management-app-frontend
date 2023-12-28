import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTasklist } from 'app/slices/taskCtrlSlice';
import { RootState } from 'app/store';
import {
  AppFocusT,
  DBResponse,
  DBData,
  PasswordArgs,
  SessionData,
} from 'app/types';
import axios from 'axios';
import {
  PAGES,
  SESSION_LOGGED_OUT,
  AXIOS_HEADERS,
  USER_API,
} from 'helper/constants';
import { createAppAsyncThunk } from 'helper/functions';

const sliceName = 'appCtrl';

export const postToDB = createAppAsyncThunk(
  sliceName + '/postToDB',
  async (
    args: { url: string; postPayload: object },
    thunkAPI
  ): Promise<DBResponse<DBData>> => {
    try {
      return {
        status: 'success',
        data: (
          await axios.post(
            args.url,
            {
              ...args.postPayload,
              ...selectAppCtrl(thunkAPI.getState() as RootState).sessionData,
            },
            AXIOS_HEADERS
          )
        ).data,
      };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return { data: e.response.data.message, status: 'error' };
      } else {
        console.error(e);
        return {
          data: { message: 'An unknown error has occurred' },
          status: 'error',
        };
      }
    }
  }
);

export const fetchUserData = createAppAsyncThunk(
  sliceName + '/fetchUserData',
  async (_args, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(fetchTasklist());
    //dispatch(fetchPunchlist());
  }
);

export const login = createAppAsyncThunk(
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

export const signup = createAppAsyncThunk(
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

export const changePassword = createAppAsyncThunk(
  sliceName + '/changePassword',
  async ({ oldPassword, newPassword }: PasswordArgs, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: USER_API.CHANGE_PASSWORD,
          postPayload: { oldPassword: oldPassword, newPassword: newPassword },
        })
      )
    ).payload as DBResponse<DBData>;
    return { ...payload, message: payload.data.message };
  }
);

export const deleteAccount = createAppAsyncThunk(
  sliceName + '/deleteAccount',
  async ({ password }: { password: string }, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: USER_API.DELETE_ACCOUNT,
          postPayload: { password: password },
        })
      )
    ).payload as DBResponse<DBData>;

    thunkAPI.dispatch(logout.fulfilled);
    return { ...payload, message: payload.data.message };
  }
);

export const logout = createAppAsyncThunk(
  sliceName + '/logout',
  async (_, thunkAPI) => {
    await thunkAPI.dispatch(
      postToDB({
        url: USER_API.LOGOUT,
        postPayload: {},
      })
    );
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
