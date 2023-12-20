import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TimePunch } from 'app/types';

const sliceName = 'punchCtrl';

interface PunchCtrlState {
  punchlist: TimePunch[];
}

export const initialPunchCtrlState = {
  punchlist: [
    {
      punchIn: 1703014542001,
      punchOut: 1703021742545,
      taskId: '65820af30025a5590f1d41ea',
      userId: '6573a8859985e010b9ec6815',
    } as TimePunch,
  ],
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
