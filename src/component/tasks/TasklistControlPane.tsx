import React from 'react';
import { tasklistCtrlBtns } from 'helper/componentConfig';
import { Box } from '@mui/material';
import 'component/tasks/_styles.css';
import { ControlBar } from 'component/helper-components/ControlBar';
import { useAppDispatch } from 'app/hooks';

export const TasklistControlPane: React.FC = () => {
  return (
    <Box className="tasklist-control-pane" data-testid="tasklist-control-pane">
      <ControlBar
        buttons={tasklistCtrlBtns}
        title="Tasks"
        dispatch={useAppDispatch()}
      />
    </Box>
  );
};
