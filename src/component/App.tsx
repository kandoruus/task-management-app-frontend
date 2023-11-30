import React from 'react';
import './App.css';
import { MasterContainer } from './master/MasterContainer/MasterContainer';
import { Box } from '@mui/material';

export function App(): JSX.Element {
  return (
    <Box className="App-wrapper">
      <MasterContainer />
    </Box>
  );
}
