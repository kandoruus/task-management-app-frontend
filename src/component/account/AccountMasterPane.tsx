import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import 'component/account/_styles.css';
import { useAppSelector, useAppDispatch, useModal } from 'app/hooks';
import {
  appCtrlSlice,
  changePassword,
  deleteAccount,
  selectAppCtrl,
} from 'app/slices/appCtrlSlice';
import { COOKIES, ERR_MSG, PAGES } from 'helper/constants';
import { useCookies } from 'react-cookie';
import { CredentialsInput } from 'component/helper-components/CredentialsInput';
import { areBlankInputs } from 'helper/functions';

export const AccountMasterPane: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([COOKIES.LOGIN]);
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  const [alertIsOpen, toggleAlert] = useModal();
  const [alertMessage, setAlertMessage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deleteAccPassword, setDeleteAccPassword] = useState('');

  const passwordsDoNotMatch = () => {
    return newPassword !== confirmNewPassword;
  };
  const sendAlert = (message: string) => {
    setAlertMessage(message);
    toggleAlert();
  };

  const handleChangePasswordClick = async () => {
    if (areBlankInputs([oldPassword, newPassword, confirmNewPassword])) {
      sendAlert(ERR_MSG.INPUT_IS_BLANK);
    } else if (passwordsDoNotMatch()) {
      sendAlert(ERR_MSG.NOT_PWD_MATCH);
    } else {
      const res = (await dispatch(changePassword({ oldPassword, newPassword })))
        .payload as { message: string; status: string } | undefined;
      if (res === undefined) {
        sendAlert(ERR_MSG.PWD_UPDATE_FAILED);
      } else if (res.status === 'success') {
        sendAlert(res.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        sendAlert(res.message);
      }
    }
  };
  const handleDeleteAccClick = async () => {
    if (areBlankInputs([deleteAccPassword])) {
      sendAlert(ERR_MSG.INPUT_IS_BLANK);
    } else {
      const res = (
        await dispatch(deleteAccount({ password: deleteAccPassword }))
      ).payload as { message: string; status: string } | undefined;
      if (res === undefined) {
        sendAlert(ERR_MSG.DELETE_ACC_FAILED);
      } else if (res.status === 'success') {
        sendAlert(res.message);
        setDeleteAccPassword('');
        removeCookie(COOKIES.LOGIN, { path: '/' });
      } else {
        sendAlert(res.message);
      }
    }
  };

  useEffect(() => {
    if (appFocus !== PAGES.ACCOUNT) {
      dispatch(appCtrlSlice.actions.focusAccount());
    }
  });
  return (
    <Box className="master-pane" data-testid="account-master-pane">
      <Box className="account-settings">
        <Box className="account-forms" sx={{ borderColor: 'primary.main' }}>
          <Typography
            color="common.white"
            sx={{ bgcolor: 'primary.main' }}
            variant="h3"
          >
            Account Settings
          </Typography>
          <Box className="form-wrapper">
            <Typography color="primary" variant="h6">
              Change Password
            </Typography>
            <CredentialsInput
              input={oldPassword}
              setInput={setOldPassword}
              label="Old Password"
              id="old-password-input"
              isPassword
            />
            <CredentialsInput
              input={newPassword}
              setInput={setNewPassword}
              label="New Password"
              id="new-password-input"
              isPassword
            />
            <CredentialsInput
              input={confirmNewPassword}
              setInput={setConfirmNewPassword}
              label="Confirm New Password"
              id="confirm-new-password-input"
              isPassword
            />
            <Button
              onClick={handleChangePasswordClick}
              variant="contained"
              sx={{ margin: '8px' }}
            >
              Change Password
            </Button>
            <Typography color="error" variant="h6">
              Delete Account
            </Typography>
            <CredentialsInput
              input={deleteAccPassword}
              setInput={setDeleteAccPassword}
              label="Password"
              id="delete-acc-password-input"
              isPassword
            />
            <Button
              onClick={handleDeleteAccClick}
              color="error"
              variant="contained"
              sx={{ margin: '8px 8px 25%' }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
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
