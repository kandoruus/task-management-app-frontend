import React, { useEffect } from 'react';
import './MasterWrapper.css';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appCtrlSlice, logout, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { MainHeader } from 'component/master/MainHeader/MainHeader';
import { PAGES, COOKIES, SESSION_LOGGED_OUT } from 'helper/constants';
import { AppDispatch } from 'app/store';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

export const MasterWrapper: React.FC = () => {
  const { sessionData, appFocus } = useAppSelector((state) =>
    selectAppCtrl(state)
  );
  const dispatch: AppDispatch = useAppDispatch();
  const [cookies] = useCookies([
    COOKIES.USERNAME,
    COOKIES.SESSIONCODE,
    COOKIES.LOGIN,
  ]);

  useEffect(() => {
    if (
      sessionData === SESSION_LOGGED_OUT &&
      cookies[COOKIES.LOGIN] === COOKIES.LOGIN
    ) {
      dispatch(
        appCtrlSlice.actions.login({
          username: cookies[COOKIES.USERNAME],
          sessionCode: cookies[COOKIES.SESSIONCODE],
        })
      );
    } else if (
      sessionData !== SESSION_LOGGED_OUT &&
      cookies[COOKIES.LOGIN] === undefined
    ) {
      dispatch(logout());
    }
  });
  return (
    <Box className="master-wrapper" data-testid="master-wrapper">
      {appFocus !== PAGES.AUTH && <MainHeader />}
      <Box className="master-container" data-testid="master-container">
        <Outlet />
      </Box>
    </Box>
  );
};
