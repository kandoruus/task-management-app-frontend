import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import './HomeMasterPane.css';
import { appCtrlSlice } from 'app/appCtrlSlice';
import { useAppDispatch } from 'app/hooks';
import { AppDispatch } from 'app/store';

export const HomeMasterPane: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const handleTasksClick = () => {
    dispatch(appCtrlSlice.actions.focusTasks());
  };
  const handleTimesheetClick = () => {
    dispatch(appCtrlSlice.actions.focusTimesheet());
  };
  const handleAccountClick = () => {
    dispatch(appCtrlSlice.actions.focusAccount());
  };
  const handleSettingsClick = () => {
    dispatch(appCtrlSlice.actions.focusSettings());
  };
  const handleAdminClick = () => {
    dispatch(appCtrlSlice.actions.focusAdmin());
  };
  return (
    <Box className="master-pane" data-testid="home-master-pane">
      <Box className="home-page">
        <Typography color="primary" variant="h4">
          Welcome to the Task Management App!
        </Typography>
        <Grid container spacing={0}>
          <Grid item>
            <Button variant="contained" onClick={handleTasksClick}>
              Tasks
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleTimesheetClick}>
              Timesheet
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAccountClick}>
              Account
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSettingsClick}>
              Settings
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAdminClick}>
              Administration
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
