import { TasklistControlPane } from '../TasklistControlPane/TasklistControlPane';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import './TasklistMasterPane.css';
import { TaskEditor } from 'component/tasks/TaskEditor/TaskEditor';
import { TasklistViewer } from 'component/tasks/TasklistViewer/TasklistViewer';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import {
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  TASKS_PAGE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const TasklistMasterPane: React.FC = () => {
  const [cookies] = useCookies([LOGIN_COOKIE]);
  const navigate = useNavigate();
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== TASKS_PAGE) {
      dispatch(appCtrlSlice.actions.focusTasks());
    }
    if (cookies[LOGIN_COOKIE] === LOGGED_OUT_STATUS) {
      navigate(WELCOME_ROUTE);
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
