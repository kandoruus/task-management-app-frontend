import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from 'app/store';
import {
  Duration,
  intervalToDuration,
  add,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { zeroDuration } from 'helper/constants';

export const areBlankInputs = (inputs: string[]) => {
  return !inputs.every((input) => input !== '');
};

//ref: https://github.com/date-fns/date-fns/issues/2253#issuecomment-1737596439
export const addDurations = (duration1: Duration, duration2: Duration) => {
  const baseDate = new Date(0);
  return {
    ...zeroDuration,
    ...intervalToDuration({
      start: baseDate,
      end: add(add(baseDate, duration1), duration2),
    }),
  };
};

export const getDaysInWeek = (date: Date): Date[] => {
  return eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) });
};

//ref: https://stackoverflow.com/a/74868789
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  // extra: { s: string; n: number } // This is extra data prop, can leave it out if you are not passing extra data
}>();
