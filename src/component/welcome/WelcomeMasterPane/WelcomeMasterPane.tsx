import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import './WelcomeMasterPane.css';
import { useAppDispatch, useAppSelector, useModal } from 'app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from 'component/welcome/LoginPage/LoginPage';
import { WelcomePage } from 'component/welcome/WelcomePage/WelcomePage';
import { SignupPage } from 'component/welcome/SignupPage/SignupPage';
import {
  AUTH_PAGE,
  HOME_ROUTE,
  LOGGED_IN_STATUS,
  LOGIN_COOKIE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { useCookies } from 'react-cookie';

export const WelcomeMasterPane: React.FC = () => {
  const [cookies] = useCookies([LOGIN_COOKIE]);
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  const [alertIsOpen, toggleAlert] = useModal();
  const [alertMessage, setAlertMessage] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sendAlert = (message: string) => {
    setAlertMessage(message);
    toggleAlert();
  };

  useEffect(() => {
    if (appFocus !== AUTH_PAGE) {
      dispatch(appCtrlSlice.actions.focusAuth());
    }
    if (cookies[LOGIN_COOKIE] === LOGGED_IN_STATUS) {
      navigate(HOME_ROUTE);
    }
  });

  return (
    <Box className="master-pane" data-testid="welcome-master-pane">
      <Box className="login-container">
        <Typography
          sx={{ bgcolor: 'primary.main', textAlign: 'center', padding: '8px' }}
          color="common.white"
          variant="h6"
        >
          Task Management App
        </Typography>
        {pathname === WELCOME_ROUTE && <WelcomePage />}
        {pathname === LOGIN_ROUTE && <LoginPage sendAlert={sendAlert} />}
        {pathname === SIGNUP_ROUTE && <SignupPage sendAlert={sendAlert} />}
      </Box>
      <Dialog open={alertIsOpen}>
        <DialogTitle>{alertMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={toggleAlert}>Okay</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
