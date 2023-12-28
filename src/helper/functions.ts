import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from 'app/store';
import {
  TaskOption,
  Tasklist,
  TimeInterval,
  TimePunch,
  TimesheetRowProps,
} from 'app/types';
import {
  Duration,
  intervalToDuration,
  add,
  startOfWeek,
  endOfWeek,
  Interval,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  isSameDay,
  eachHourOfInterval,
  eachDayOfInterval,
  startOfHour,
  endOfHour,
  areIntervalsOverlapping,
  getHours,
} from 'date-fns';
import { zeroDuration } from 'helper/constants';

export const areBlankInputs = (inputs: string[]) => {
  return !inputs.every((input) => input !== '');
};

//ref: https://stackoverflow.com/a/74868789
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  // extra: { s: string; n: number } // This is extra data prop, can leave it out if you are not passing extra data
}>();

//get the taskIds referenced in the given punchlist
export const getTaskIdsFromPunchlist = (list: TimePunch[]): string[] => {
  return Array.from(new Set(list.map((punch) => punch.taskId)));
};

//peak at the end of an array without mutating the array
export const peak = <T>(a: T[]): T => {
  return a[a.length - 1];
};

//turn a tasklist into options for a select box
export const getTaskOptions = (tasklist: Tasklist): TaskOption[] => {
  return tasklist.map((task) => ({ id: task._id, label: task.data.name }));
};

//check a list of ids against a tasklist to see if all ids have an associated task
export const matchTaskIdsToNames = (
  tasklist: Tasklist,
  taskIds: string[]
): string[] => {
  let countUnknowns = 0;
  taskIds.forEach((id) => {
    if (tasklist.find((task) => task._id === id) === undefined) countUnknowns++;
  });
  const taskNames = tasklist.map((task) => task.data.name);
  return countUnknowns === 0
    ? taskNames
    : [...taskNames, countUnknowns + ' Unknown Task(s)'];
};

export const isBetween = (
  x: number,
  lowerBound: number,
  upperBound: number,
  isInclusive?: boolean
): boolean => {
  if (isInclusive) {
    return x >= lowerBound && x <= upperBound;
  } else {
    return x > lowerBound && x < upperBound;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////
// Time manipulation functions
/////////////////////////////////////////////////////////////////////////////////////////
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

//get the interval between the provided dates
export const createInterval = (start: number, end: number): Interval => {
  return { start, end };
};

//get the duration of punches in a list
export const getTotalDurationWithinInterval = (
  punchlist: TimePunch[],
  interval: TimeInterval
): Duration => {
  return punchlist.reduce((total: Duration, punch: TimePunch) => {
    const punchInterval = createInterval(
      Math.max(punch.punchIn, interval.start),
      Math.min(punch.punchOut || Date.now(), interval.end)
    );
    return addDurations(total, intervalToDuration(punchInterval));
  }, zeroDuration);
};

export const getTimeInterval = (start: number, end: number): TimeInterval => {
  return { start, end };
};

export const getHourlyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(
    startOfHour(date).getTime(),
    endOfHour(date).getTime()
  );
};

export const getDailyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(startOfDay(date).getTime(), endOfDay(date).getTime());
};

export const getWeeklyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(
    startOfWeek(date).getTime(),
    endOfWeek(date).getTime()
  );
};

export const getMonthlyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(
    startOfMonth(date).getTime(),
    endOfMonth(date).getTime()
  );
};

export const getQuarterlyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(
    startOfQuarter(date).getTime(),
    endOfQuarter(date).getTime()
  );
};

export const getYearlyTimeInterval = (date: number): TimeInterval => {
  return getTimeInterval(
    startOfYear(date).getTime(),
    endOfYear(date).getTime()
  );
};

export const getTimesheetRowProps = (
  interval: TimeInterval
): TimesheetRowProps[] => {
  const isHourlyView = isSameDay(interval.start, interval.end);
  return isHourlyView
    ? eachHourOfInterval(interval).map((hour) => ({
        interval: getHourlyTimeInterval(hour.getTime()),
        isHourlyView,
      }))
    : eachDayOfInterval(interval).map((day) => ({
        interval: getDailyTimeInterval(day.getTime()),
        isHourlyView,
      }));
};

export const isPunchInInterval = (
  interval: TimeInterval,
  punch: TimePunch
): boolean => {
  const punchInterval = getTimeInterval(
    punch.punchIn,
    punch.punchOut || Date.now()
  );
  return areIntervalsOverlapping(interval, punchInterval);
};

export const shouldUseExtraPadding = (
  interval: TimeInterval,
  isHourlyView: boolean
): boolean => {
  return isHourlyView && isBetween(getHours(interval.start), 0, 10);
};
