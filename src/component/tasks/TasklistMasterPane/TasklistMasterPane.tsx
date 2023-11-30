import { TasklistControlPane } from '../TasklistControlPane/TasklistControlPane';
import { TaskEditor } from '../TaskEditor/TaskEditor';
import { TasklistViewer } from '../TasklistViewer/TasklistViewer';
import React from 'react';
import { Box } from '@mui/material';
import './TasklistMasterPane.css';

export const TasklistMasterPane: React.FC = () => {
  return (
    <Box className="tasklist-master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
      <TaskEditor />
    </Box>
  );
};
