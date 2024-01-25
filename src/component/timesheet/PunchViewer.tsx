import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Menu, Typography } from '@mui/material';
import 'component/timesheet/_styles.css';
import { LocalPunch, TimePunch } from 'app/types';
import { useAppDispatch, useTaskNameFromId } from 'app/hooks';
import { format } from 'date-fns';
import { deletePunch, updatePunch } from 'app/slices/punchCtrlSlice';
import { PunchEditor } from 'component/timesheet/PunchEditor';

export interface PunchViewerProps {
  open: boolean;
  punch: TimePunch;
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

export const PunchViewer: React.FC<PunchViewerProps> = ({
  open,
  punch,
  anchorEl,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const taskName = useTaskNameFromId(punch.taskId) || 'Unknown Task';
  const [localPunch, setLocalPunch] = useState({
    ...punch,
    taskName: taskName,
    isPunchedOut: punch.punchOut !== undefined,
  });
  const [isInEditMode, setIsInEditMode] = useState(false);

  const updateLocalPunch = (newPunch: LocalPunch) => {
    setLocalPunch({ ...newPunch });
  };

  const resetState = () => {
    updateLocalPunch({
      ...punch,
      taskName,
      isPunchedOut: punch.punchOut !== undefined,
    });
    setIsInEditMode(false);
  };

  const close = () => {
    onClose();
    resetState();
  };

  useEffect(() => {
    resetState();
  }, [punch]);

  const PunchData: React.FC<{
    label: string;
    value: string;
  }> = ({ label, value }) => {
    return (
      <Box sx={{ m: '0px auto 10px auto', width: '35ch', pl: '4px' }}>
        <Typography>{label + ': ' + value}</Typography>
      </Box>
    );
  };

  return (
    <Menu open={open} onClose={close} anchorEl={anchorEl}>
      <Box className="punch-details">
        {isInEditMode ? (
          <PunchEditor punch={localPunch} update={updateLocalPunch} />
        ) : (
          <>
            <PunchData label="Task" value={taskName} />
            <PunchData
              label="Start Time"
              value={format(punch.punchIn, 'H:mm')}
            />
            <PunchData
              label="Start Date"
              value={format(punch.punchIn, 'yyyy-MM-dd')}
            />
            <PunchData
              label="End Time"
              value={format(punch.punchOut || Date.now(), 'H:mm')}
            />
            <PunchData
              label="End Date"
              value={format(punch.punchOut || Date.now(), 'yyyy-MM-dd')}
            />
          </>
        )}

        {isInEditMode ? (
          <ButtonGroup
            variant="contained"
            sx={{ m: '10px auto', width: '35ch' }}
          >
            <Button
              onClick={() => {
                close();
                dispatch(deletePunch(punch.id));
              }}
              sx={{ width: '33%' }}
              color="error"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                resetState();
              }}
              sx={{ width: '34%' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                let updatedPunch = {
                  ...punch,
                  punchIn: localPunch.punchIn,
                  taskId: localPunch.taskId,
                };
                if (localPunch.isPunchedOut) {
                  updatedPunch = {
                    ...updatedPunch,
                    punchOut: localPunch.punchOut,
                  };
                }
                close();
                dispatch(updatePunch(updatedPunch));
              }}
              sx={{ width: '33%' }}
            >
              Save
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setIsInEditMode(true);
            }}
            sx={{ m: '10px auto', width: '301.875px' }}
          >
            Edit Punch
          </Button>
        )}
      </Box>
    </Menu>
  );
};
