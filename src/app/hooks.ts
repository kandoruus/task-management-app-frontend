import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';
import { selectTaskCtrl } from 'app/slices/taskCtrlSlice';
import { selectPunchCtrl } from 'app/slices/punchCtrlSlice';
import {
  IntervalSummary,
  Task,
  TaskInfo,
  TimeInterval,
  TimePunch,
  TimeSheetRowData,
  TimesheetViewerProps,
} from 'app/types';
import {
  getDailyTimeInterval,
  getIntervalAsString,
  getTaskIdsFromPunchlist,
  getTotalTime,
  isPunchInInterval,
  matchTaskIdsToNames,
} from 'helper/functions';
import { eachDayOfInterval } from 'date-fns';

//useModal hook base on this article: https://upmostly.com/tutorials/modal-components-react-custom-hooks
export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return [isOpen, toggle];
};

//get the tasklist filtered by a list of ids
export const useTasklistByIds = (taskIds: string[]): Task[] => {
  return useAppSelector((state) =>
    selectTaskCtrl(state).tasklist.filter((task) => {
      return taskIds.includes(task._id);
    })
  );
};

//use for get the names of tasks associated with the ids referenced in the punchlist
export const useTaskInfoFromPunchList = (
  punchlist: TimePunch[]
): TaskInfo[] => {
  const listOfTaskIds = getTaskIdsFromPunchlist(punchlist);
  const listOfTasks = useTasklistByIds(listOfTaskIds);
  return matchTaskIdsToNames(listOfTasks, listOfTaskIds);
};
//get the name of the task associated with the provided id, return a blank string if no match is found
export const useTaskNameFromId = (id: string): string => {
  const task = useAppSelector((state) => {
    return selectTaskCtrl(state).tasklist.find((task) => task._id === id);
  });
  return task?.data.name || '';
};

//get the punchlist filtered by interval
export const usePunchlistInInterval = (interval: TimeInterval): TimePunch[] => {
  return useAppSelector((state) =>
    selectPunchCtrl(state).punchlist.filter((punch) =>
      isPunchInInterval(interval, punch)
    )
  );
};

//get the tasknames and time punched in for a given interval
export const useIntervalSummary = (interval: TimeInterval): IntervalSummary => {
  const punchlist = usePunchlistInInterval(interval);
  return {
    taskNames: useTaskInfoFromPunchList(punchlist)
      .map((info) => info.name)
      .join(', '),
    totalTime: getTotalTime(punchlist, interval),
  };
};

export const useTimesheetRowProps = (
  outerInterval: TimeInterval
): TimeInterval[] => {
  return eachDayOfInterval(outerInterval).map((date) =>
    getDailyTimeInterval(date.getTime())
  );
};

//get the props needed for the timesheetviewer
export const useTimesheetViewerProps = (): TimesheetViewerProps => {
  const { displayInterval } = useAppSelector((state) => selectPunchCtrl(state));
  const intervalSummary = useIntervalSummary(displayInterval);
  return {
    ...intervalSummary,
    rowProps: useTimesheetRowProps(displayInterval),
  };
};

export const useTimesheetRowData = (
  interval: TimeInterval
): TimeSheetRowData => {
  const summary = useIntervalSummary(interval);
  const intervalAsString = getIntervalAsString(interval.start);
  return { ...summary, intervalAsString };
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
