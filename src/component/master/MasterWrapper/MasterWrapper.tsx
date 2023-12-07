import React, { useEffect } from 'react';
import './MasterWrapper.css';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { MainHeader } from 'component/master/MainHeader/MainHeader';
import {
  AUTH_PAGE,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  SESSIONCODE_COOKIE,
  SESSION_LOGGED_OUT,
  USERNAME_COOKIE,
} from 'helper/constants';
import { AppDispatch } from 'app/store';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

/* saving to use elsewhere
if (
      sessionData !== SESSION_LOGGED_OUT &&
      cookies[LOGIN_COOKIE] !== LOGGED_IN_STATUS
    ) {
      setCookie(USERNAME_COOKIE, sessionData.username, { path: '/' });
      setCookie(SESSIONCODE_COOKIE, sessionData.sessionCode, { path: '/' });
      setCookie(LOGIN_COOKIE, LOGGED_IN_STATUS, { path: '/' });
    } else 
*/

export const MasterWrapper: React.FC = () => {
  const { sessionData, appFocus } = useAppSelector((state) =>
    selectAppCtrl(state)
  );
  const dispatch: AppDispatch = useAppDispatch();
  const [cookies] = useCookies([
    USERNAME_COOKIE,
    SESSIONCODE_COOKIE,
    LOGIN_COOKIE,
  ]);

  useEffect(() => {
    if (
      sessionData === SESSION_LOGGED_OUT &&
      cookies[LOGIN_COOKIE] === LOGGED_IN_STATUS
    ) {
      dispatch(
        appCtrlSlice.actions.login({
          username: cookies[USERNAME_COOKIE],
          sessionCode: cookies[SESSIONCODE_COOKIE],
        })
      );
    } else if (
      sessionData !== SESSION_LOGGED_OUT &&
      cookies[LOGIN_COOKIE] === LOGGED_OUT_STATUS
    ) {
      dispatch(appCtrlSlice.actions.logout());
    }
  });
  return (
    <Box className="master-wrapper" data-testid="master-wrapper">
      {appFocus !== AUTH_PAGE && <MainHeader />}
      <Box className="master-container" data-testid="master-container">
        <Outlet />
      </Box>
    </Box>
  );
};
