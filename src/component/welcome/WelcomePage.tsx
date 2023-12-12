import React from 'react';
import 'component/welcome/_styles.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PAGES } from 'helper/constants';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="login-inner-wrapper"
      sx={{ width: '50%' }}
      data-testid="welcome-page"
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate(PAGES.LOGIN);
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(PAGES.SIGNUP);
        }}
        sx={{ mt: '16px' }}
      >
        Sign Up
      </Button>
    </Box>
  );
};
