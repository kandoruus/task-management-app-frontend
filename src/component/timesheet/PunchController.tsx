import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import 'component/timesheet/_styles.css';
import {
  useAppSelector,
  useAppDispatch,
  useTaskNameFromId,
  useModal,
} from 'app/hooks';
import { NO_TASK_SELECTED } from 'helper/constants';
import { punchIn, punchOut, selectPunchCtrl } from 'app/slices/punchCtrlSlice';
import {
  TaskSelector,
  createTaskSelectorProps,
} from 'component/timesheet/TaskSelector';
import { YesNoDialog } from 'component/_helper-components/YesNoDialog';
import { TaskOption } from 'app/types';

export const PunchController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isClockedIn, currentActivity } = useAppSelector((state) =>
    selectPunchCtrl(state)
  );
  const [openQuery, toggleQuery] = useModal();
  const [selectedTask, setSelectedTask] = useState(NO_TASK_SELECTED);

  const handleTaskSelection = (value: TaskOption) => {
    setSelectedTask(value);
    if (isClockedIn && value !== NO_TASK_SELECTED) toggleQuery();
  };

  const TaskSelectorProps = {
    in: createTaskSelectorProps(
      'Active Task',
      {
        label: useTaskNameFromId(currentActivity.taskId),
        id: currentActivity.taskId,
      },
      handleTaskSelection
    ),
    out: createTaskSelectorProps(
      'Select Task',
      selectedTask,
      handleTaskSelection
    ),
  };

  const handlePunchInClick = () => {
    dispatch(punchIn(selectedTask.id));
  };

  const handlePunchOutClick = () => {
    dispatch(punchOut());
  };

  const handleChangeTaskRes = async (isChangingTasks: boolean) => {
    if (isChangingTasks) {
      dispatch(punchOut()).then(() => {
        dispatch(punchIn(selectedTask.id));
      });
    } else {
      setSelectedTask(NO_TASK_SELECTED);
    }
  };

  return (
    <Box className="punch-interface">
      <Box>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: '20px' }}>
          Status: Clocked {isClockedIn ? 'In' : 'Out'}
        </Typography>
        <Box
          sx={{
            m: '10px auto',
            width: '300px',
          }}
        >
          <ButtonGroup variant="contained" sx={{ width: '100%' }}>
            {isClockedIn ? (
              <Button sx={{ width: '100%' }} onClick={handlePunchOutClick}>
                Punch Out
              </Button>
            ) : (
              <Button
                sx={{ width: '100%' }}
                onClick={handlePunchInClick}
                disabled={selectedTask.id === ''}
              >
                Punch In
              </Button>
            )}
          </ButtonGroup>
          <TaskSelector
            {...(isClockedIn ? TaskSelectorProps.in : TaskSelectorProps.out)}
          />
        </Box>
      </Box>
      <YesNoDialog
        open={openQuery}
        closeDialog={toggleQuery}
        question={'Do you want to change tasks?'}
        response={handleChangeTaskRes}
      />
    </Box>
  );
};
