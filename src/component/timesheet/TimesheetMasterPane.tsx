import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'component/timesheet/_styles.css';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { PAGES } from 'helper/constants';

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
      TIMESHEET
    </Box>
  );
};
