import React, { useState } from 'react';
import './MasterContainer.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppFocusT } from 'app/types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  ACCOUNT_PAGE,
  HOME_PAGE,
  TASKS_PAGE,
  TIMESHEET_PAGE,
} from 'helper/constants';
import { AppDispatch } from 'app/store';
import { appCtrlSlice } from 'app/appCtrlSlice';
import { HomeMasterPane } from 'component/home/HomeMasterPane/HomeMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane/TimesheetMasterPane';
import { AccountMasterPane } from 'component/account/AccountMasterPane/AccountMasterPane';
import { TasklistMasterPane } from 'component/tasks/TasklistMasterPane/TasklistMasterPane';

export const MasterContainer: React.FC = () => {
  const focus: AppFocusT = useAppSelector((state) => state.appCtrl.appFocus);
  const dispatch: AppDispatch = useAppDispatch();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleHomeClick = () => {
    if (focus !== HOME_PAGE) {
      dispatch(appCtrlSlice.actions.focusHome());
      handleMenuClose();
    }
  };
  const handleTasksClick = () => {
    dispatch(appCtrlSlice.actions.focusTasks());
    handleMenuClose();
  };
  const handleTimesheetClick = () => {
    dispatch(appCtrlSlice.actions.focusTimesheet());
    handleMenuClose();
  };
  const handleAccountClick = () => {
    dispatch(appCtrlSlice.actions.focusAccount());
    handleMenuClose();
  };
  /* Pushed to v3
  const handleSettingsClick = () => {
    dispatch(appCtrlSlice.actions.focusSettings());
    handleMenuClose();
  };
  const handleAdminClick = () => {
    dispatch(appCtrlSlice.actions.focusAdmin());
    handleMenuClose();
  }*/
  return (
    <Box className="master-container" data-testid="master-container">
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            data-testid="main-menu-btn"
            size="large"
            edge="start"
            color="inherit"
            className="menu-icon"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            data-testid="main-menu"
            anchorEl={menuAnchor}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            {focus !== HOME_PAGE && (
              <MenuItem onClick={handleHomeClick}>Home</MenuItem>
            )}
            {focus !== TASKS_PAGE && (
              <MenuItem onClick={handleTasksClick}>Tasks</MenuItem>
            )}
            {focus !== TIMESHEET_PAGE && (
              <MenuItem onClick={handleTimesheetClick}>Timesheet</MenuItem>
            )}
            {focus !== ACCOUNT_PAGE && (
              <MenuItem onClick={handleAccountClick}>Account</MenuItem>
            )}
            {/* Pushed to v3
            {focus !== SETTINGS_PAGE && (
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            )}
            {focus !== ADMIN_PAGE && (
              <MenuItem onClick={handleAdminClick}>Administration</MenuItem>
            )}*/}
          </Menu>
          <Typography
            className={focus !== HOME_PAGE ? 'main-menu-header' : ''}
            onClick={handleHomeClick}
            noWrap
            variant="h6"
          >
            Task Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <Box className="master-wrapper">
        {focus === HOME_PAGE && <HomeMasterPane />}
        {focus === TASKS_PAGE && <TasklistMasterPane />}
        {focus === TIMESHEET_PAGE && <TimesheetMasterPane />}
        {focus === ACCOUNT_PAGE && <AccountMasterPane />}
        {/* Pushed to v3 
        {focus === ADMIN_PAGE && <AdminMasterPane />}
        {focus === SETTINGS_PAGE && <SettingsMasterPane />}*/}
      </Box>
    </Box>
  );
};
