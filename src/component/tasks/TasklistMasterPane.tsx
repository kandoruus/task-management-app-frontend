import { TasklistControlPane } from 'component/tasks/TasklistControlPane';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'component/tasks/_styles.css';
import { TaskEditor } from 'component/tasks/TaskEditor';
import { TasklistViewer } from 'component/tasks/TasklistViewer';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { COOKIES, PAGES } from 'helper/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const TasklistMasterPane: React.FC = () => {
  const [cookies] = useCookies([COOKIES.LOGIN]);
  const navigate = useNavigate();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== PAGES.TASKS) {
      dispatch(appCtrlSlice.actions.focusTasks());
    }
    if (cookies[COOKIES.LOGIN] === undefined) {
      navigate(PAGES.WELCOME);
    }
  });
  return (
    <Box className="master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
      <TaskEditor />
    </Box>
  );
};
