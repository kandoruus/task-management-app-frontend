import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import 'component/timesheet/_styles.css';
import {
  useAppSelector,
  usePunchlistInInterval,
  useTaskNamesFromPunchList,
} from 'app/hooks';
import { durationFormatOptions } from 'helper/constants';
import { TimesheetRow } from 'component/timesheet/TimesheetRow';
import {
  getTimesheetRowProps,
  getTotalDurationWithinInterval,
} from 'helper/functions';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';
import { formatDuration } from 'date-fns';
import { selectPunchCtrl } from 'app/slices/punchCtrlSlice';

export const TimesheetViewer: React.FC = () => {
  const { displayInterval } = useAppSelector((state) => selectPunchCtrl(state));
  const punchlist = usePunchlistInInterval(displayInterval);
  const taskNames = useTaskNamesFromPunchList(punchlist);

  const getTotalTime = (): string => {
    return formatDuration(
      getTotalDurationWithinInterval(punchlist, displayInterval),
      durationFormatOptions
    );
  };
  return (
    <Box
      className="timesheet-display"
      sx={{ overflowY: 'auto', maxHeight: '70vh' }}
    >
      <Table size="small" sx={{ borderBottom: '1px solid lightgrey' }}>
        <TableHead>
          <TableRow>
            <SmTableCell>Date</SmTableCell>
            <SmTableCell>Hours</SmTableCell>
            <TableCell>Tasks</TableCell>
            <SmTableCell>Edit</SmTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTimesheetRowProps(displayInterval).map((props, index) => (
            <TimesheetRow {...props} key={'ts-row-' + index} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <SmTableCell>Weekly total</SmTableCell>
            <SmTableCell>{getTotalTime()}</SmTableCell>
            <TableCell>{taskNames}</TableCell>
            <SmTableCell></SmTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};
