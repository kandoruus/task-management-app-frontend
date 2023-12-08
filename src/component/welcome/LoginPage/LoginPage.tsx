import React, { useState } from 'react';
import './LoginPage.css';
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
import {
  USER_API,
  AXIOS_HEADERS,
  SIGNUP_ROUTE,
  LOGIN_COOKIE,
  SESSIONCODE_COOKIE,
  USERNAME_COOKIE,
  LOGGED_IN_STATUS,
} from 'helper/constants';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type Props = {
  sendAlert: (message: string) => void;
};

export const LoginPage: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies([
    USERNAME_COOKIE,
    SESSIONCODE_COOKIE,
    LOGIN_COOKIE,
  ]);
  const navigate = useNavigate();
  const { sendAlert } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleLogin = async () => {
    try {
      const resData = (
        await axios.post(
          USER_API.LOGIN,
          {
            username,
            password,
          },
          AXIOS_HEADERS
        )
      ).data;
      setCookie(LOGIN_COOKIE, LOGGED_IN_STATUS, { path: '/' });
      setCookie(USERNAME_COOKIE, resData.username, { path: '/' });
      setCookie(SESSIONCODE_COOKIE, resData.sessionCode, { path: '/' });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        sendAlert(e.response.data.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <Box className="login-inner-wrapper" data-testid="login-page">
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          m: '0 8px',
          p: '0 14px',
        }}
      >
        <Typography color={'primary'} sx={{ lineHeight: '24.5px' }}>
          {"Don't have an account?"}
        </Typography>
        <Button
          onClick={() => {
            navigate(SIGNUP_ROUTE);
          }}
          sx={{ width: 'fit-content', padding: '0', m: '0 8px 0 auto' }}
        >
          Sign Up
        </Button>
      </Box>
      <Button onClick={handleLogin} variant="contained" sx={{ m: '8px' }}>
        Login
      </Button>
    </Box>
  );
};
