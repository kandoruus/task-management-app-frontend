import { TasklistMasterPane } from '../TasklistManagement/TasklistMasterPane/TasklistMasterPane';
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const MasterContainer: React.FC = () => {
  return (
    <Box className="master-container" data-testid="master-container">
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            className="menu-icon"
          >
            <MenuIcon />
          </IconButton>
          <Typography className="main-header" noWrap variant="h6">
            Task Management App
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box className="master-wrapper">
        <TasklistMasterPane />
      </Box>
    </Box>
  );
};
