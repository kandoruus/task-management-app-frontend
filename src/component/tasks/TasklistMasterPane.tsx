import { TasklistControlPane } from 'component/tasks/TasklistControlPane';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'component/tasks/_styles.css';
import { TaskEditor } from 'component/tasks/TaskEditor';
import { TasklistViewer } from 'component/tasks/TasklistViewer';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl } from 'app/slices/appCtrlSlice';
import { PAGES } from 'helper/constants';

export const TasklistMasterPane: React.FC = () => {
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appFocus !== PAGES.TASKS) {
      dispatch(appCtrlSlice.actions.focusTasks());
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
