import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'component/timesheet/_styles.css';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { PAGES } from 'helper/constants';
import { TimesheetToolbar } from 'component/timesheet/TimesheetToolbar';
import { TimesheetViewer } from 'component/timesheet/TimesheetViewer';
import { PunchController } from 'component/timesheet/PunchController';

export const TimesheetMasterPane: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));

  useEffect(() => {
    if (appFocus !== PAGES.TIMESHEET) {
      dispatch(appCtrlSlice.actions.focusTimesheet());
    }
  });
  return (
    <Box className="master-pane" data-testid="timesheet-master-pane">
      <TimesheetToolbar />
      <TimesheetViewer />
      <PunchController />
    </Box>
  );
};
