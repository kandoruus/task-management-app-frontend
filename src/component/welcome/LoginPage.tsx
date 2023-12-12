import React, { useState } from 'react';
import 'component/welcome/_styles.css';
import { Box, Button, Typography } from '@mui/material';
import { COOKIES, PAGES, ERR_MSG } from 'helper/constants';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CredentialsInput } from 'component/helper-components/CredentialsInput';
import { areBlankInputs } from 'helper/functions';
import { useAppDispatch } from 'app/hooks';
import { login } from 'app/slices/appCtrlSlice';

type Props = {
  sendAlert: (message: string) => void;
};

export const LoginPage: React.FC<Props> = (props) => {
  const setCookie = useCookies([
    COOKIES.USERNAME,
    COOKIES.SESSIONCODE,
    COOKIES.LOGIN,
  ])[1];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sendAlert } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    if (areBlankInputs([password, username])) {
      sendAlert(ERR_MSG.INPUT_IS_BLANK);
    } else {
      const res = (await dispatch(login({ username, password }))).payload as
        | {
            data: { message: string; username: string; sessionCode: string };
            status: string;
          }
        | undefined;
      if (res === undefined) {
        sendAlert(ERR_MSG.LOGIN_FAILED);
      } else if (res.status === 'success') {
        setCookie(COOKIES.LOGIN, COOKIES.LOGIN, { path: '/' });
        setCookie(COOKIES.USERNAME, res.data.username, { path: '/' });
        setCookie(COOKIES.SESSIONCODE, res.data.sessionCode, { path: '/' });
      } else {
        sendAlert(res.data.message);
      }
    }
  };

  return (
    <Box className="login-inner-wrapper" data-testid="login-page">
      <CredentialsInput
        input={username}
        setInput={setUsername}
        label="Username"
        id="username-input"
      />
      <CredentialsInput
        input={password}
        setInput={setPassword}
        label="Password"
        id="password-input"
        isPassword
      />
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
            navigate(PAGES.SIGNUP);
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
