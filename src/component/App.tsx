import React from 'react';
import './App.css';
import { MasterContainer } from './master/MasterContainer/MasterContainer';
import { Box } from '@mui/material';
import { LoginScreen } from 'component/master/LoginScreen/LoginScreen';
import { useAppSelector } from 'app/hooks';
import { AUTH_PAGE } from 'helper/constants';
import { AppFocusT } from 'app/types';

export function App(): JSX.Element {
  const focus: AppFocusT = useAppSelector((state) => state.appCtrl.appFocus);
  return (
    <Box className="App-wrapper">
      {focus === AUTH_PAGE ? <LoginScreen /> : <MasterContainer />}
    </Box>
  );
}
