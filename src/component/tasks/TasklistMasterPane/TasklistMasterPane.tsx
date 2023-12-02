import { TasklistControlPane } from '../TasklistControlPane/TasklistControlPane';
import React from 'react';
import { Box } from '@mui/material';
import './TasklistMasterPane.css';
import { TaskEditor } from 'component/tasks/TaskEditor/TaskEditor';
import { TasklistViewer } from 'component/tasks/TasklistViewer/TasklistViewer';

export const TasklistMasterPane: React.FC = () => {
  return (
    <Box className="master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
      <TaskEditor />
    </Box>
  );
};
