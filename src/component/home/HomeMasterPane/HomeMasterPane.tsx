import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import './HomeMasterPane.css';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import {
  ACCOUNT_ROUTE,
  HOME_PAGE,
  LOGGED_IN_STATUS,
  LOGIN_COOKIE,
  TASKS_ROUTE,
  TIMESHEET_ROUTE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const HomeMasterPane: React.FC = () => {
  const [cookies] = useCookies([LOGIN_COOKIE]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const handleTasksClick = () => {
    navigate(TASKS_ROUTE);
  };
  const handleTimesheetClick = () => {
    navigate(TIMESHEET_ROUTE);
  };
  const handleAccountClick = () => {
    navigate(ACCOUNT_ROUTE);
  };
  /* pushed to v3
  const handleSettingsClick = () => {
    dispatch(appCtrlSlice.actions.focusSettings());
  };
  const handleAdminClick = () => {
    dispatch(appCtrlSlice.actions.focusAdmin());
  };*/
  useEffect(() => {
    if (appFocus !== HOME_PAGE) {
      dispatch(appCtrlSlice.actions.focusHome());
    }
    if (cookies[LOGIN_COOKIE] !== LOGGED_IN_STATUS) {
      navigate(WELCOME_ROUTE);
    }
  });
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
          {/* pushed to v3
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
          */}
        </Grid>
      </Box>
    </Box>
  );
};
