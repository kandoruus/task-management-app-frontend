import React from 'react';
import { Box } from '@mui/material';
import 'component/timesheet/_styles.css';
import { useAppDispatch } from 'app/hooks';
import { ControlBar } from 'component/_helper-components/ControlBar';
import SettingsIcon from '@mui/icons-material/Settings';
import { getTimeCtrlBtns } from 'helper/componentConfig';

export const TimesheetToolbar: React.FC = () => {
  return (
    <Box className="timesheet-control-pane">
      <ControlBar
        buttons={getTimeCtrlBtns()}
        tooltipLabel="Set View"
        title="Timesheet"
        dispatch={useAppDispatch()}
      >
        <SettingsIcon />
      </ControlBar>
    </Box>
  );
};
