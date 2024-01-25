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
  PunchlistData,
} from 'app/types';
import {
  BLANK_ACTIVITY_DATA,
  INITIAL_TIMESHEET_DISPLAY_INTERVAL,
  PUNCH_API,
} from 'helper/constants';
import {
  createAppAsyncThunk,
  deleteIndexFromArray,
  peak,
  sortPunchlist,
} from 'helper/functions';

const sliceName = 'punchCtrl';

export const createPunch = createAppAsyncThunk(
  sliceName + '/createPunch',
  async (punch: TimePunch, thunkAPI) => {
    const { id: _id, ...postPayload } = punch;
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
      return { ...postPayload, id: payload.data.id };
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

export const fetchPunchlist = createAppAsyncThunk(
  sliceName + '/fetchPunchlist',
  async (_, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.PUNCHLIST,
          postPayload: {},
        })
      )
    ).payload as DBResponse<PunchlistData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return payload.data.punchlist.map((punch) => {
        const punchIn = parseInt(punch.punchIn);
        const punchOut =
          punch.punchOut !== undefined ? parseInt(punch.punchOut) : undefined;
        const { taskId, userId } = punch;
        return { id: punch._id, punchIn, punchOut, taskId, userId };
      });
    }
  }
);

export const updatePunch = createAppAsyncThunk(
  sliceName + '/updatePunch',
  async (updatedPunch: TimePunch, thunkAPI) => {
    const { userId: _, ...postPayload } = updatedPunch;
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.UPDATE,
          postPayload,
        })
      )
    ).payload as DBResponse<DBData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return updatedPunch;
    }
  }
);

export const deletePunch = createAppAsyncThunk(
  sliceName + '/deletePunch',
  async (id: string, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.DELETE,
          postPayload: { id },
        })
      )
    ).payload as DBResponse<DBData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return id;
    }
  }
);

export const deleteAllUserPunches = createAppAsyncThunk(
  sliceName + '/deleteAllUserPunches',
  async (_, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.DELETE_BY_USER,
          postPayload: {},
        })
      )
    ).payload as DBResponse<DBData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return payload.data.message;
    }
  }
);

export const deleteAllTaskPunches = createAppAsyncThunk(
  sliceName + '/deleteAllTaskPunches',
  async (taskId: string, thunkAPI) => {
    const payload = (
      await thunkAPI.dispatch(
        postToDB({
          url: PUNCH_API.DELETE_BY_TASK,
          postPayload: { taskId },
        })
      )
    ).payload as DBResponse<DBData>;
    if (payload.status === 'error') {
      return thunkAPI.rejectWithValue(payload.data.message);
    } else {
      return payload.data.message;
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
    initializeClockedStatus: (state) => {
      const lastPunch = peak(state.punchlist);
      if (state.punchlist.length < 1 || lastPunch.punchOut !== undefined) {
        state.isClockedIn = false;
        state.currentActivity = BLANK_ACTIVITY_DATA;
      } else {
        state.isClockedIn = true;
        state.currentActivity = {
          punchId: lastPunch.id,
          taskId: lastPunch.taskId,
        };
      }
    },
    setDisplayInterval: (state, action: PayloadAction<TimeInterval>) => {
      state.displayInterval = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPunch.fulfilled, (state, action) => {
      state.punchlist = sortPunchlist([...state.punchlist, action.payload]);
      const lastPunch = peak(state.punchlist);
      if (state.punchlist.length < 1 || lastPunch.punchOut !== undefined) {
        state.isClockedIn = false;
        state.currentActivity = BLANK_ACTIVITY_DATA;
      } else {
        state.isClockedIn = true;
        state.currentActivity = {
          punchId: lastPunch.id,
          taskId: lastPunch.taskId,
        };
      }
    });
    builder.addCase(createPunch.rejected, (_, action) => {
      console.error(new Error(action.payload));
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
    builder.addCase(fetchPunchlist.fulfilled, (state, action) => {
      state.punchlist = [...action.payload];
    });
    builder.addCase(fetchPunchlist.rejected, (_, action) => {
      console.error(new Error(action.payload));
    });
    builder.addCase(updatePunch.fulfilled, (state, action) => {
      state.punchlist[
        state.punchlist.findIndex((punch) => punch.id === action.payload.id)
      ] = { ...action.payload };
    });
    builder.addCase(updatePunch.rejected, (_, action) => {
      console.error(new Error(action.payload));
    });
    builder.addCase(deletePunch.fulfilled, (state, action) => {
      const indexToDelete = state.punchlist.findIndex(
        (punch) => punch.id === action.payload
      );
      state.punchlist = deleteIndexFromArray(state.punchlist, indexToDelete);
    });
    builder.addCase(deletePunch.rejected, (_, action) => {
      console.error(new Error(action.payload));
    });
  },
});

export const selectPunchCtrl = (state: RootState) => state.punchCtrl;
export default punchCtrlSlice.reducer;
