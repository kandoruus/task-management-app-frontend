import React from 'react';
import { Box } from '@mui/material';
import './TimesheetMasterPane.css';

export const TimesheetMasterPane: React.FC = () => {
  return (
    <Box className="master-pane" data-testid="timesheet-master-pane">
      TIMESHEET
    </Box>
  );
};
