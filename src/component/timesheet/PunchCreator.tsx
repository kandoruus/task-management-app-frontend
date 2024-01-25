import React, { useState } from 'react';
import 'component/timesheet/_styles.css';
import { Box, Button, ButtonGroup } from '@mui/material';
import { PunchEditor } from 'component/timesheet/PunchEditor';
import { BLANK_LOCAL_PUNCH } from 'helper/constants';
import { createPunch } from 'app/slices/punchCtrlSlice';
import { useAppDispatch } from 'app/hooks';

export const PunchCreator: React.FC<{ toggleView: () => void }> = ({
  toggleView,
}) => {
  const dispatch = useAppDispatch();
  const [localPunch, setLocalPunch] = useState(BLANK_LOCAL_PUNCH);

  const resetState = () => {
    setLocalPunch(BLANK_LOCAL_PUNCH);
  };

  return (
    <Box
      sx={{
        m: '20px auto',
        width: '35ch',
      }}
    >
      <PunchEditor punch={localPunch} update={setLocalPunch} />
      <ButtonGroup variant="contained" sx={{ m: '10px auto', width: '100%' }}>
        <Button
          onClick={() => {
            resetState();
            toggleView();
          }}
          sx={{ width: '50%' }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const {
              taskName: _taskName,
              isPunchedOut: _isPunchedOut,
              ...punch
            } = localPunch;
            resetState();
            toggleView();
            dispatch(createPunch(punch));
          }}
          sx={{ width: '50%' }}
          disabled={localPunch.taskId === ''}
        >
          Save
        </Button>
      </ButtonGroup>
    </Box>
  );
};
