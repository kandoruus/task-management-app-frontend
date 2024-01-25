import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from 'app/store';
import {
  TaskInfo,
  TaskOption,
  Tasklist,
  TimeInterval,
  TimePunch,
} from 'app/types';
import {
  Duration,
  intervalToDuration,
  add,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  startOfHour,
  endOfHour,
  areIntervalsOverlapping,
  differenceInHours,
  formatDuration,
  format,
  setHours,
  setMinutes,
  setYear,
  setMonth,
  setDate,
} from 'date-fns';
import { durationFormatOptions, zeroDuration } from 'helper/constants';

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

//return a copy of the given array with the item at the given index removed
export const deleteIndexFromArray = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

//turn a tasklist into options for a select box
export const getTaskOptions = (tasklist: Tasklist): TaskOption[] => {
  return tasklist.map((task) => ({ id: task._id, label: task.data.name }));
};

//check a list of ids against a tasklist to see if all ids have an associated task
export const matchTaskIdsToNames = (
  tasklist: Tasklist,
  taskIds: string[]
): TaskInfo[] => {
  let countUnknowns = 0;
  return taskIds.map((id) => {
    const task = tasklist.find((task) => task._id === id);
    if (task === undefined) {
      countUnknowns++;
      return { name: 'Unknown Task ' + countUnknowns, id };
    } else {
      return { name: task.data.name, id };
    }
  });
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
export const getTimeInterval = (start: number, end: number): TimeInterval => {
  return { start, end };
};

export const getTimeIntervalFromPunch = (punch: TimePunch): TimeInterval => {
  return getTimeInterval(punch.punchIn, punch.punchOut || Date.now());
};

export const getTimeIntervalWithinInterval = (
  start: number,
  end: number | undefined,
  boundary: TimeInterval
): TimeInterval => {
  return getTimeInterval(
    Math.max(start, boundary.start),
    Math.min(end || Date.now(), boundary.end)
  );
};

export const intervalToDurationNoHourCap = (
  interval: TimeInterval
): Duration => {
  const { minutes, seconds } = intervalToDuration(interval);
  const hours = differenceInHours(interval.end, interval.start);
  const duration = {
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0,
  };
  return duration;
};

//ref: https://github.com/date-fns/date-fns/issues/2253#issuecomment-1737596439
export const addDurations = (duration1: Duration, duration2: Duration) => {
  const baseDate = new Date(0);
  return {
    ...intervalToDurationNoHourCap(
      getTimeInterval(
        baseDate.getTime(),
        add(add(baseDate, duration1), duration2).getTime()
      )
    ),
  };
};

//get the duration of punches in a list
export const getTotalDurationWithinInterval = (
  punchlist: TimePunch[],
  interval: TimeInterval
): Duration => {
  const totalDuration = punchlist.reduce(
    (total: Duration, punch: TimePunch) => {
      const punchInterval = getTimeIntervalWithinInterval(
        punch.punchIn,
        punch.punchOut,
        interval
      );
      const punchDuration = intervalToDurationNoHourCap(punchInterval);
      return addDurations(total, punchDuration);
    },
    zeroDuration
  );
  return totalDuration;
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

export const getTotalTime = (
  punchlist: TimePunch[],
  displayInterval: TimeInterval
): string => {
  return formatDuration(
    getTotalDurationWithinInterval(punchlist, displayInterval),
    durationFormatOptions
  );
};

export const getIntervalAsString = (
  start: number,
  isHourlyView?: boolean
): string => {
  return format(start, isHourlyView ? 'h:mmaaa' : 'M/d/yy');
};

export const setTimeStampTime = (
  timeStamp: number,
  timeString: string
): number => {
  const [hours, minutes] = timeString.split(':');
  return setHours(
    setMinutes(timeStamp, Number(minutes)),
    Number(hours)
  ).getTime();
};

export const setTimeStampDate = (
  timeStamp: number,
  dateString: string
): number => {
  const [year, month, day] = dateString.split('-');
  return setYear(
    setMonth(setDate(timeStamp, Number(day)), Number(month) - 1),
    Number(year)
  ).getTime();
};

//returns copy of punchlist sorted by punchIn time
export const sortPunchlist = (punchlist: TimePunch[]): TimePunch[] => {
  return [...punchlist].sort((a, b) => a.punchIn - b.punchIn);
};

export const arePunchesClosed = (punchlist: TimePunch[]): boolean => {
  return sortPunchlist(punchlist)
    .slice(0, punchlist.length - 1)
    .reduce(
      (arePunchesClosed, punch) =>
        arePunchesClosed && punch.punchOut !== undefined,
      true
    );
};

export const arePunchesOverlapping = (
  a: TimePunch,
  b: TimePunch | undefined
): boolean => {
  return b === undefined
    ? false
    : areIntervalsOverlapping(
        getTimeIntervalFromPunch(a),
        getTimeIntervalFromPunch(b)
      );
};

export const doesPunchlistHaveOverlaps = (punchlist: TimePunch[]): boolean => {
  return punchlist.reduce(
    (hasOverlaps, punch, index, array) =>
      hasOverlaps || arePunchesOverlapping(punch, array[index + 1]),
    false
  );
};

export const isPunchlistSorted = (punchlist: TimePunch[]): boolean => {
  return sortPunchlist(punchlist).reduce(
    (isSorted, punch, index) => isSorted && punch.id === punchlist[index].id,
    true
  );
};

interface PunchlistValidator {
  isSorted: boolean;
  isInactivePunchesClosed: boolean;
  isNoOverlappingPunches: boolean;
}

export const punchlistIsValid = (
  punchlist: TimePunch[]
): PunchlistValidator => {
  const isSorted = isPunchlistSorted(punchlist);
  const isInactivePunchesClosed = arePunchesClosed(punchlist);
  const isNoOverlappingPunches = doesPunchlistHaveOverlaps(punchlist);
  return { isSorted, isInactivePunchesClosed, isNoOverlappingPunches };
};
