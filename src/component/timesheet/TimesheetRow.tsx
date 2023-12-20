import { TableRow, TableCell } from '@mui/material';
import { useAppSelector, useTasklistByIds } from 'app/hooks';
import { selectPunchCtrl } from 'app/slices/punchCtrlSlice';
import { TimePunch } from 'app/types';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';
import {
  Duration,
  format,
  formatDuration,
  intervalToDuration,
  isSameDay,
} from 'date-fns';
import { durationFormatOptions, zeroDuration } from 'helper/constants';
import { addDurations } from 'helper/functions';
import React from 'react';

interface Props {
  date: Date;
}

export const TimesheetRow: React.FC<Props> = ({ date }) => {
  const punchlist: TimePunch[] = useAppSelector((state) =>
    selectPunchCtrl(state).punchlist.filter((punch) => {
      return isSameDay(new Date(punch.punchIn), date);
    })
  );
  const listOfTasks = useTasklistByIds(punchlist.map((punch) => punch.taskId));

  const getTotalTime = (): string => {
    return formatDuration(
      punchlist.reduce((total: Duration, punch: TimePunch) => {
        const start = new Date(punch.punchIn);
        const end = new Date(punch.punchOut || Date.now());
        return addDurations(total, intervalToDuration({ start, end }));
      }, zeroDuration),
      durationFormatOptions
    );
  };
  const getTaskNames = (): string => {
    return listOfTasks.map((task) => task.data.name).join(', ');
  };

  return (
    <TableRow>
      <SmTableCell>{format(date, 'M/d/yy')}</SmTableCell>
      <SmTableCell>{getTotalTime()}</SmTableCell>
      <TableCell>{getTaskNames()}</TableCell>
      <SmTableCell></SmTableCell>
    </TableRow>
  );
};
