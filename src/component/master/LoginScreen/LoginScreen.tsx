import React, { useState } from 'react';
import './LoginScreen.css';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
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
  LOGIN_USER_API,
  AXIOS_HEADERS,
  SIGNUP_USER_API,
} from 'helper/constants';
import { useAppDispatch, useModal } from 'app/hooks';
import { appCtrlSlice } from 'app/appCtrlSlice';

export const LoginScreen: React.FC = () => {
  const [paneDisplayed, setPaneDisplayed] = useState('Query');
  const [alertIsOpen, toggleAlert] = useModal();
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useAppDispatch();

  const sendAlert = (message: string) => {
    setAlertMessage(message);
    toggleAlert();
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const QueryPane: React.FC = () => {
    return (
      <Box className="login-inner-wrapper" sx={{ width: '50%' }}>
        <Button
          variant="contained"
          onClick={() => {
            setPaneDisplayed('Login');
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setPaneDisplayed('Signup');
          }}
          sx={{ mt: '16px' }}
        >
          Sign Up
        </Button>
      </Box>
    );
  };
  const LoginPane: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleLogin = async () => {
      try {
        const resData = (
          await axios.post(
            LOGIN_USER_API,
            {
              username,
              password,
            },
            AXIOS_HEADERS
          )
        ).data;
        dispatch(
          appCtrlSlice.actions.login({
            username: resData.username,
            sessionCode: resData.message,
          })
        );
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          sendAlert(e.response.data.message);
        } else {
          console.error(e);
        }
      }
    };
    return (
      <Box className="login-inner-wrapper">
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
              setPaneDisplayed('Signup');
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
  const SignupPane: React.FC = () => {
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
            SIGNUP_USER_API,
            {
              username,
              password,
            },
            AXIOS_HEADERS
          )
        ).data;
        sendAlert(resData.message);
        setPaneDisplayed('Login');
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          sendAlert(e.response.data.message);
        } else {
          console.error(e);
        }
      }
    };
    return (
      <Box className="login-inner-wrapper">
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
              setPaneDisplayed('Login');
            }}
            sx={{ width: 'fit-content', padding: '0', ml: 'auto' }}
          >
            Login
          </Button>
        </Box>
        <Button
          onClick={handleSignup}
          variant="contained"
          sx={{ margin: '8px' }}
        >
          Sign Up
        </Button>
      </Box>
    );
  };

  return (
    <Box className="auth-page-wrapper" data-testid="auth-page-wrapper">
      <Box className="login-container">
        <Typography
          sx={{ bgcolor: 'primary.main', textAlign: 'center', padding: '8px' }}
          color="common.white"
          variant="h6"
        >
          Task Management App
        </Typography>
        {paneDisplayed === 'Query' && <QueryPane />}
        {paneDisplayed === 'Login' && <LoginPane />}
        {paneDisplayed === 'Signup' && <SignupPane />}
      </Box>
      <Dialog open={alertIsOpen}>
        <DialogTitle>{alertMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={toggleAlert}>Okay</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
