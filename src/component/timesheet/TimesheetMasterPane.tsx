import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'component/timesheet/_styles.css';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { COOKIES, PAGES } from 'helper/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const TimesheetMasterPane: React.FC = () => {
  const [cookies] = useCookies([COOKIES.LOGIN]);
  const navigate = useNavigate();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== PAGES.TIMESHEET) {
      dispatch(appCtrlSlice.actions.focusTimesheet());
    }
    if (cookies[COOKIES.LOGIN] === undefined) {
      navigate(PAGES.WELCOME);
    }
  });
  return (
    <Box className="master-pane" data-testid="timesheet-master-pane">
      TIMESHEET
    </Box>
  );
};
