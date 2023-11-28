import { TasklistControlPane } from './TasklistControlPane';
import { TaskEditor } from './TaskEditor';
import { TasklistViewer } from './TasklistViewer';
import React from 'react';
import { Box } from '@mui/material';

export const TasklistMasterPane: React.FC = () => {
  return (
    <Box className="tasklist-master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
      <TaskEditor />
    </Box>
  );
};
