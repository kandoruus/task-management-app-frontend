import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector, useModal } from 'app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from 'component/welcome/LoginPage';
import { WelcomePage } from 'component/welcome/WelcomePage';
import { SignupPage } from 'component/welcome/SignupPage';
import { COOKIES, PAGES } from 'helper/constants';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { useCookies } from 'react-cookie';
import 'component/welcome/_styles.css';

export const WelcomeMasterPane: React.FC = () => {
  const [cookies] = useCookies([COOKIES.LOGIN]);
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
    if (appFocus !== PAGES.AUTH) {
      dispatch(appCtrlSlice.actions.focusAuth());
    }
    if (cookies[COOKIES.LOGIN] === COOKIES.LOGIN) {
      navigate(PAGES.HOME);
    }
  });

  return (
    <Box className="master-pane" data-testid="welcome-master-pane">
      <Box className="login-container" sx={{ borderColor: 'primary.main' }}>
        <Typography
          sx={{
            bgcolor: 'primary.main',
            textAlign: 'center',
            padding: '8px',
            borderRadius: '12px 12px 0px 0px',
          }}
          color="common.white"
          variant="h6"
        >
          Task Management App
        </Typography>
        {pathname === PAGES.WELCOME && <WelcomePage />}
        {pathname === PAGES.LOGIN && <LoginPage sendAlert={sendAlert} />}
        {pathname === PAGES.SIGNUP && <SignupPage sendAlert={sendAlert} />}
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
