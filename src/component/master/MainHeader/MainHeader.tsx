import React, { useState } from 'react';
import './MainHeader.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppFocusT } from 'app/types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  ACCOUNT_PAGE,
  ACCOUNT_ROUTE,
  HOME_PAGE,
  HOME_ROUTE,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  TASKS_PAGE,
  TASKS_ROUTE,
  TIMESHEET_PAGE,
  TIMESHEET_ROUTE,
} from 'helper/constants';
import { AppDispatch } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies([LOGIN_COOKIE]);
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
      navigate(HOME_ROUTE);
      handleMenuClose();
    }
  };
  const handleLogoutClick = () => {
    setCookie(LOGIN_COOKIE, LOGGED_OUT_STATUS, { path: '/' });
    dispatch(appCtrlSlice.actions.logout());
  };
  const handleTasksClick = () => {
    navigate(TASKS_ROUTE);
    handleMenuClose();
  };
  const handleTimesheetClick = () => {
    navigate(TIMESHEET_ROUTE);
    handleMenuClose();
  };
  const handleAccountClick = () => {
    navigate(ACCOUNT_ROUTE);
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
    <Box className="main-header" data-testid="main-header">
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
            className={focus !== HOME_PAGE ? 'clickable-typography' : ''}
            onClick={handleHomeClick}
            noWrap
            variant="h6"
          >
            Task Management App
          </Typography>
          <Button
            color="inherit"
            className="logout-btn"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </Box>
  );
};
