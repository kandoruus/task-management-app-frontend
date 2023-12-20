import React, { useEffect } from 'react';
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
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { PAGES } from 'helper/constants';
import { ControlBar } from 'component/_helper-components/ControlBar';
import SettingsIcon from '@mui/icons-material/Settings';
import { timesheetCtrlBtns } from 'helper/componentConfig';
import { TimesheetRow } from 'component/timesheet/TimesheetRow';
import { getDaysInWeek } from 'helper/functions';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';

export const TimesheetMasterPane: React.FC = () => {
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== PAGES.TIMESHEET) {
      dispatch(appCtrlSlice.actions.focusTimesheet());
    }
  });
  return (
    <Box className="master-pane" data-testid="timesheet-master-pane">
      <Box className="timesheet-control-pane">
        <ControlBar
          buttons={timesheetCtrlBtns}
          tooltipLabel="Set View"
          title="Timesheet"
          dispatch={useAppDispatch()}
        >
          <SettingsIcon />
        </ControlBar>
      </Box>
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
          {getDaysInWeek(new Date(Date.now())).map((date, index) => (
            <TimesheetRow date={date} key={'ts-row-' + index} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <SmTableCell>Weekly total</SmTableCell>
            <SmTableCell>0:00</SmTableCell>
            <TableCell>Blah, blah blah, bl...</TableCell>
            <SmTableCell></SmTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};
