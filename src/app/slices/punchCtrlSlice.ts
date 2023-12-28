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
    mock: (state) => {
      console.log(state);
    },
  },
});

export const selectPunchCtrl = (state: RootState) => state.punchCtrl;
export default punchCtrlSlice.reducer;
