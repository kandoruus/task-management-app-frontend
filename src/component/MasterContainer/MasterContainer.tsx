import { TasklistMasterPane } from 'component/TaskListManagement/TasklistMasterPane';
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Dehaze } from '@mui/icons-material';

export const MasterContainer: React.FC = () => {
  return (
    <div className="master-container" data-testid="master-container">
      <AppBar>
        <Toolbar>
          <IconButton>
            <Dehaze style={{ color: 'white' }} />
          </IconButton>
          <Typography noWrap variant="h6" style={{ marginLeft: '1rem' }}>
            Task Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <TasklistMasterPane />
    </div>
  );
};
