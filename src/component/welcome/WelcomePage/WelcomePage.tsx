import React from 'react';
import './WelcomePage.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from 'helper/constants';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="login-inner-wrapper" sx={{ width: '50%' }}>
      <Button
        variant="contained"
        onClick={() => {
          navigate(LOGIN_ROUTE);
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(SIGNUP_ROUTE);
        }}
        sx={{ mt: '16px' }}
      >
        Sign Up
      </Button>
    </Box>
  );
};
