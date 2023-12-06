import React from 'react';
import './WelcomePage.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="login-inner-wrapper" sx={{ width: '50%' }}>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/task-management-app/login');
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/task-management-app/signup');
        }}
        sx={{ mt: '16px' }}
      >
        Sign Up
      </Button>
    </Box>
  );
};
