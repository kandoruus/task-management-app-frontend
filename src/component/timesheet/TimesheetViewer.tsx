import React, { useState } from 'react';
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
import { useModal, useTimesheetViewerProps } from 'app/hooks';
import { TimesheetRow } from 'component/timesheet/TimesheetRow';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';
import { DailyView } from 'component/timesheet/DailyView';
import { TimeInterval } from 'app/types';
import { BLANK_TIME_INTERVAL } from 'helper/constants';

export const TimesheetViewer: React.FC = () => {
  const { taskNames, totalTime, rowProps } = useTimesheetViewerProps();
  const [dailyViewIsOpen, toggleDailyView] = useModal();
  const [dayToView, setDayToView] = useState<TimeInterval>(BLANK_TIME_INTERVAL);

  const viewDay = (day: TimeInterval) => {
    setDayToView(day);
    toggleDailyView();
  };

  const closeDay = () => {
    setDayToView(BLANK_TIME_INTERVAL);
    toggleDailyView();
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
            <SmTableCell>Time</SmTableCell>
            <TableCell>Tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowProps.map((interval, index) => (
            <TimesheetRow {...{ interval, viewDay }} key={'ts-row-' + index} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <SmTableCell>Weekly total</SmTableCell>
            <SmTableCell>{totalTime}</SmTableCell>
            <TableCell>{taskNames}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <DailyView open={dailyViewIsOpen} day={dayToView} onClose={closeDay} />
    </Box>
  );
};
