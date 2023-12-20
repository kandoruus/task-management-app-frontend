import React from 'react';
import { tasklistCtrlBtns } from 'helper/componentConfig';
import { Box } from '@mui/material';
import 'component/tasks/_styles.css';
import { ControlBar } from 'component/_helper-components/ControlBar';
import { useAppDispatch } from 'app/hooks';
import MenuIcon from '@mui/icons-material/Menu';

export const TasklistControlPane: React.FC = () => {
  return (
    <Box className="tasklist-control-pane" data-testid="tasklist-control-pane">
      <ControlBar
        buttons={tasklistCtrlBtns}
        title="Tasks"
        dispatch={useAppDispatch()}
      >
        <MenuIcon />
      </ControlBar>
    </Box>
  );
};
