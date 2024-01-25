import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import 'component/timesheet/_styles.css';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { PAGES } from 'helper/constants';
import { TimesheetToolbar } from 'component/timesheet/TimesheetToolbar';
import { TimesheetViewer } from 'component/timesheet/TimesheetViewer';
import { PunchController } from 'component/timesheet/PunchController';
import { PunchCreator } from 'component/timesheet/PunchCreator';

export const TimesheetMasterPane: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const [isManualEntry, setIsManualEntry] = useState(false);

  const toggleEntryView = () => {
    setIsManualEntry(!isManualEntry);
  };

  useEffect(() => {
    if (appFocus !== PAGES.TIMESHEET) {
      dispatch(appCtrlSlice.actions.focusTimesheet());
    }
  });
  return (
    <Box className="master-pane" data-testid="timesheet-master-pane">
      <TimesheetToolbar />
      <TimesheetViewer />
      {isManualEntry ? (
        <PunchCreator toggleView={toggleEntryView} />
      ) : (
        <PunchController toggleView={toggleEntryView} />
      )}
    </Box>
  );
};
