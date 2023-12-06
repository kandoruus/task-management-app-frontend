import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import './AccountMasterPane.css';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import {
  ACCOUNT_PAGE,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const AccountMasterPane: React.FC = () => {
  const [cookies] = useCookies([LOGIN_COOKIE]);
  const navigate = useNavigate();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== ACCOUNT_PAGE) {
      dispatch(appCtrlSlice.actions.focusAccount());
    }
    if (cookies[LOGIN_COOKIE] === LOGGED_OUT_STATUS) {
      navigate(WELCOME_ROUTE);
    }
  });
  return (
    <Box className="master-pane" data-testid="account-master-pane">
      ACCOUNT
    </Box>
  );
};
