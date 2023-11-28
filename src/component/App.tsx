import React from 'react';
import '../styles/App.css';
import { MasterContainer } from 'component/MasterContainer/MasterContainer';
import { Box } from '@mui/material';

export function App(): JSX.Element {
  return (
    <Box className="App-wrapper">
      <MasterContainer />
    </Box>
  );
}
