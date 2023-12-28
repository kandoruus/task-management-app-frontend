import React, { useState } from 'react';
import 'component/master/_styles.css';
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
import { PAGES, COOKIES } from 'helper/constants';
import { AppDispatch } from 'app/store';
import { logout } from 'app/slices/appCtrlSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies([
    COOKIES.USERNAME,
    COOKIES.USERID,
    COOKIES.SESSIONCODE,
    COOKIES.LOGIN,
  ]);
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
    if (focus !== PAGES.HOME) {
      navigate(PAGES.HOME);
      handleMenuClose();
    }
  };
  const handleLogoutClick = () => {
    removeCookie(COOKIES.SESSIONCODE, { path: '/' });
    removeCookie(COOKIES.USERNAME, { path: '/' });
    removeCookie(COOKIES.USERID, { path: '/' });
    removeCookie(COOKIES.LOGIN, { path: '/' });
    dispatch(logout());
  };
  const handleTasksClick = () => {
    navigate(PAGES.TASKS);
    handleMenuClose();
  };
  const handleTimesheetClick = () => {
    navigate(PAGES.TIMESHEET);
    handleMenuClose();
  };
  const handleAccountClick = () => {
    navigate(PAGES.ACCOUNT);
    handleMenuClose();
  };

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
            {focus !== PAGES.HOME && (
              <MenuItem onClick={handleHomeClick}>Home</MenuItem>
            )}
            {focus !== PAGES.TASKS && (
              <MenuItem onClick={handleTasksClick}>Tasks</MenuItem>
            )}
            {focus !== PAGES.TIMESHEET && (
              <MenuItem onClick={handleTimesheetClick}>Timesheet</MenuItem>
            )}
            {focus !== PAGES.ACCOUNT && (
              <MenuItem onClick={handleAccountClick}>Account</MenuItem>
            )}
          </Menu>
          <Typography
            className={focus !== PAGES.HOME ? 'clickable-typography' : ''}
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
