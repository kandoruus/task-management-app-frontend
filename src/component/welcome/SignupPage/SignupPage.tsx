import React, { useState } from 'react';
import './SignupPage.css';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { AXIOS_HEADERS, PAGES, USER_API } from 'helper/constants';
import { useNavigate } from 'react-router-dom';

type Props = {
  sendAlert: (message: string) => void;
};

export const SignupPage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { sendAlert } = props;
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleSignup = async () => {
    try {
      const resData = (
        await axios.post(
          USER_API.SIGNUP,
          {
            username,
            password,
          },
          AXIOS_HEADERS
        )
      ).data;
      sendAlert(resData.message);
      navigate(PAGES.LOGIN);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        sendAlert(e.response.data.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <Box className="login-inner-wrapper" data-testid="signup-page">
      <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-username">Username</InputLabel>
        <OutlinedInput
          id="outlined-username"
          type="text"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirm-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showPasswordConfirm ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordConfirm}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          m: '0 8px',
          p: '0 14px',
        }}
      >
        <Typography color={'primary'} sx={{ lineHeight: '24.5px' }}>
          Already have an account?
        </Typography>
        <Button
          onClick={() => {
            navigate(PAGES.LOGIN);
          }}
          sx={{ width: 'fit-content', padding: '0', ml: 'auto' }}
        >
          Login
        </Button>
      </Box>
      <Button onClick={handleSignup} variant="contained" sx={{ margin: '8px' }}>
        Sign Up
      </Button>
    </Box>
  );
};
