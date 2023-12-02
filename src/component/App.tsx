import React from 'react';
import './App.css';
//import { MasterContainer } from './master/MasterContainer/MasterContainer';
import { Box } from '@mui/material';
import { LoginScreen } from 'component/master/LoginScreen/LoginScreen';

export function App(): JSX.Element {
  return (
    <Box className="App-wrapper">
      <LoginScreen />
    </Box>
  );
}
