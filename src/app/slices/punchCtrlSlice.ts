import { selectAppCtrl } from './appCtrlSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { postToDB } from 'app/slices/appCtrlSlice';
import { RootState } from 'app/store';
import {
  ActivityData,
  DBResponse,
  DBData,
  PunchInData,
  TimePunch,
  TimeInterval,
} from 'app/types';
import {
  BLANK_ACTIVITY_DATA,
  INITIAL_TIMESHEET_DISPLAY_INTERVAL,
  PUNCH_API,
} from 'helper/constants';
import { createAppAsyncThunk, peak } from 'helper/functions';

const sliceName = 'punchCtrl';

export const initializeClockedStatus = createAppAsyncThunk(
  sliceName + 'initializeClockedStatus',
  async (_, thunkAPI) => {
    const { punchlist } = selectPunchCtrl(thunkAPI.getState());
    const lastPunch = peak(punchlist);
    if (punchlist.length < 1 || lastPunch.punchOut !== undefined) {
      return {
        isClockedIn: false,
        currentActivity: BLANK_ACTIVITY_DATA,
      };
    } else {
      return {
        isClockedIn: true,
        currentActivity: {
          punchId: lastPunch.id,
          taskId: lastPunch.taskId,
        },
      };
    }
  }
);

export const punchIn = createAppAsyncThunk(
  sliceName + '/punchIn',
  async (taskId: string, thunkAPI) => {
    const postPayload = {
      punchIn: Date.now(),
      userId: selectAppCtrl(thunkAPI.getState()).sessionData.userId,
      taskId,
    };
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.PUNCH_IN,
          postPayload,
        })
      )
    ).payload as DBResponse<PunchInData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      const punchId = payload.data.id;
      return {
        newPunch: { ...postPayload, id: punchId },
        currentActivity: {
          punchId,
          taskId,
        },
      };
    }
  }
);

export const punchOut = createAppAsyncThunk(
  sliceName + '/punchOut',
  async (_, thunkAPI) => {
    const postPayload = {
      punchOut: Date.now(),
      id: selectPunchCtrl(thunkAPI.getState()).currentActivity.punchId,
    };
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.PUNCH_OUT,
          postPayload,
        })
      )
    ).payload as DBResponse<DBData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return postPayload;
    }
  }
);

interface PunchCtrlState {
  punchlist: TimePunch[];
  isClockedIn: boolean;
  currentActivity: ActivityData;
  displayInterval: TimeInterval;
}

export const initialPunchCtrlState = {
  punchlist: [],
  isClockedIn: false,
  currentActivity: BLANK_ACTIVITY_DATA,
  displayInterval: INITIAL_TIMESHEET_DISPLAY_INTERVAL,
} as PunchCtrlState;

export const punchCtrlSlice = createSlice({
  name: sliceName,
  initialState: initialPunchCtrlState,
  reducers: {
    setDisplayInterval: (state, action: PayloadAction<TimeInterval>) => {
      state.displayInterval = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeClockedStatus.fulfilled, (state, action) => {
      state.isClockedIn = action.payload.isClockedIn;
      state.currentActivity = { ...action.payload.currentActivity };
    });
    builder.addCase(punchIn.fulfilled, (state, action) => {
      state.punchlist = [...state.punchlist, { ...action.payload.newPunch }];
      state.isClockedIn = true;
      state.currentActivity = { ...action.payload.currentActivity };
    });
    builder.addCase(punchIn.rejected, (_, action) => {
      console.error(new Error(action.payload));
    });
    builder.addCase(punchOut.fulfilled, (state, action) => {
      const punchIndex = state.punchlist.findIndex(
        (punch) => punch.id === action.payload.id
      );
      const updatedPunch = {
        ...state.punchlist[punchIndex],
        punchOut: action.payload.punchOut,
      };
      state.punchlist = [
        ...state.punchlist.slice(0, punchIndex),
        updatedPunch,
        ...state.punchlist.slice(punchIndex + 1),
      ];
      state.isClockedIn = false;
    });
    builder.addCase(punchOut.rejected, (_, action) => {
      console.error(new Error(action.payload));
    });
  },
});

export const selectPunchCtrl = (state: RootState) => state.punchCtrl;
export default punchCtrlSlice.reducer;
