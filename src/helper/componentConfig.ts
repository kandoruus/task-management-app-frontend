import { punchCtrlSlice, fetchPunchlist } from 'app/slices/punchCtrlSlice';
import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  saveTasklist,
} from 'app/slices/taskCtrlSlice';
import { TimeInterval } from 'app/types';
import { TIME_OF_LOAD } from 'helper/constants';
import {
  getDailyTimeInterval,
  getMonthlyTimeInterval,
  getQuarterlyTimeInterval,
  getWeeklyTimeInterval,
  getYearlyTimeInterval,
} from 'helper/functions';
import { ActionCreator } from 'redux';

export type MenuButtonConfig = {
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: ActionCreator<any>;
};

export const tasklistCtrlBtns: MenuButtonConfig[] = [
  {
    id: 'load-tl-btn',
    value: 'Load Tasks',
    action: fetchTasklist,
  },
  {
    id: 'delete-tl-btn',
    value: 'Delete Tasks',
    action: deleteTasklist,
  },
  {
    id: 'save-tl-btn',
    value: 'Save Tasks',
    action: saveTasklist,
  },
  {
    id: 'new-task-tl-btn',
    value: 'Create Task',
    action: createNewTask,
  },
];

export const getTimeCtrlBtns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  customInterval?: TimeInterval
): MenuButtonConfig[] => {
  return [
    {
      id: 'view-day-btn',
      value: 'Daily',
      action: () => {
        return punchCtrlSlice.actions.setDisplayInterval(
          getDailyTimeInterval(TIME_OF_LOAD)
        );
      },
    },
    {
      id: 'view-week-btn',
      value: 'Weekly',
      action: () => {
        return punchCtrlSlice.actions.setDisplayInterval(
          getWeeklyTimeInterval(TIME_OF_LOAD)
        );
      },
    },
    {
      id: 'view-month-btn',
      value: 'Monthly',
      action: () => {
        return punchCtrlSlice.actions.setDisplayInterval(
          getMonthlyTimeInterval(TIME_OF_LOAD)
        );
      },
    },
    {
      id: 'view-quarter-btn',
      value: 'Quarterly',
      action: () => {
        return punchCtrlSlice.actions.setDisplayInterval(
          getQuarterlyTimeInterval(TIME_OF_LOAD)
        );
      },
    },
    {
      id: 'view-year-btn',
      value: 'Yearly',
      action: () => {
        return punchCtrlSlice.actions.setDisplayInterval(
          getYearlyTimeInterval(TIME_OF_LOAD)
        );
      },
    },
    {
      id: 'fetch-punchlist-btn',
      value: 'Load Punches',
      action: () => {
        return fetchPunchlist();
      },
    },
    /*{
      id: 'set-view-btn',
      value: 'Custom',
      action: () => {
        //dispatch(punchCtrlSlice.actions.setDisplayInterval(customInterval));
      },
    },*/
  ];
};

export const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
export const statusOptions = [
  'Not Started',
  'In Progress',
  'Roadblocked',
  'Completed',
];
