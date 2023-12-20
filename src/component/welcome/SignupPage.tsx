import React, { useState } from 'react';
import 'component/welcome/_styles.css';
import { Box, Button, Typography } from '@mui/material';
import { ERR_MSG, PAGES } from 'helper/constants';
import { useNavigate } from 'react-router-dom';
import { CredentialsInput } from 'component/_helper-components/CredentialsInput';
import { areBlankInputs } from 'helper/functions';
import { useAppDispatch } from 'app/hooks';
import { signup } from 'app/slices/appCtrlSlice';

type Props = {
  sendAlert: (message: string) => void;
};

export const SignupPage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { sendAlert } = props;
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsDoNotMatch = () => {
    return password !== confirmPassword;
  };
  const handleSignup = async () => {
    if (areBlankInputs([username, password, confirmPassword])) {
      sendAlert(ERR_MSG.INPUT_IS_BLANK);
    } else if (passwordsDoNotMatch()) {
      sendAlert(ERR_MSG.NOT_PWD_MATCH);
    } else {
      const res = (await dispatch(signup({ username, password }))).payload as
        | {
            message: string;
            status: string;
          }
        | undefined;
      if (res === undefined) {
        sendAlert(ERR_MSG.SIGNUP_FAILED);
      } else if (res.status === 'success') {
        sendAlert(res.message);
        navigate(PAGES.LOGIN);
      } else {
        sendAlert(res.message);
      }
    }
  };

  return (
    <Box className="login-inner-wrapper" data-testid="signup-page">
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
      <CredentialsInput
        input={confirmPassword}
        setInput={setConfirmPassword}
        label="Confirm Password"
        id="confirm-password-input"
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
