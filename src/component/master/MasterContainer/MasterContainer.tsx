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
  ADMIN_PAGE,
  HOME_PAGE,
  SETTINGS_PAGE,
  TASKS_PAGE,
  TIMESHEET_PAGE,
} from 'helper/constants';
import { AppDispatch } from 'app/store';
import { appCtrlSlice } from 'app/appCtrlSlice';
import { HomeMasterPane } from 'component/home/HomeMasterPane/HomeMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane/TimesheetMasterPane';
import { AccountMasterPane } from 'component/account/AccountMasterPane/AccountMasterPane';
import { AdminMasterPane } from 'component/administration/AdminMasterPane/AdminMasterPane';
import { SettingsMasterPane } from 'component/settings/SettingsMasterPane/SettingsMasterPane';
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
    dispatch(appCtrlSlice.actions.focusHome());
    handleMenuClose();
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
  const handleSettingsClick = () => {
    dispatch(appCtrlSlice.actions.focusSettings());
    handleMenuClose();
  };
  const handleAdminClick = () => {
    dispatch(appCtrlSlice.actions.focusAdmin());
    handleMenuClose();
  };
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
          <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleHomeClick}>Home</MenuItem>
            <MenuItem onClick={handleTasksClick}>Tasks</MenuItem>
            <MenuItem onClick={handleTimesheetClick}>Timesheet</MenuItem>
            <MenuItem onClick={handleAccountClick}>Account</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            <MenuItem onClick={handleAdminClick}>Administration</MenuItem>
          </Menu>
          <Typography noWrap variant="h6">
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
        {focus === ADMIN_PAGE && <AdminMasterPane />}
        {focus === SETTINGS_PAGE && <SettingsMasterPane />}
      </Box>
    </Box>
  );
};
