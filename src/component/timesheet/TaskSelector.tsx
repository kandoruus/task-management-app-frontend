import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { createNewTask, selectTaskCtrl } from 'app/slices/taskCtrlSlice';
import { getTaskOptions } from 'helper/functions';
import { TaskOption, TaskSelectorChangeHandler } from 'app/types';
import { NO_TASK_SELECTED } from 'helper/constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TaskEditor } from 'component/tasks/TaskEditor';

interface TaskSelectorProps {
  label: string;
  value: TaskOption;
  onChange: (value: TaskOption) => void;
}
export const TaskSelector: React.FC<TaskSelectorProps> = ({
  onChange,
  label,
  value,
}) => {
  const dispatch = useAppDispatch();
  const tasklistAsOptions = [
    { label: 'create-task', id: 'create-task' },
    ...getTaskOptions(
      useAppSelector((state) => selectTaskCtrl(state).tasklist)
    ),
  ];

  const handleChange: TaskSelectorChangeHandler = (
    _,
    newValue /*, reason, details (useful for debugging)*/
  ) => {
    if (newValue === null) {
      onChange(NO_TASK_SELECTED);
    } else if (newValue.id !== value.id) {
      onChange(newValue);
    }
  };

  const renderCreateTaskOption = (): React.ReactNode => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            width: '227px',
            height: '24px',
            pl: '0.05rem',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: 'gray',
          }}
        >
          Create new Task
        </Box>
        <Tooltip title="Create new task" placement="bottom-start">
          <IconButton
            sx={{
              p: 0,
              height: '24px',
              width: '24px',
            }}
            onClick={() => {
              dispatch(createNewTask());
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  return (
    <Box sx={{ mt: '10px', width: '100%', bgcolor: 'common.white' }}>
      <Autocomplete
        sx={{ width: '100%' }}
        isOptionEqualToValue={(option, value) => {
          return (
            option.id === value.id ||
            value.id === '' ||
            value.id === 'TASK_ID_FOR_BLANK_PUNCH' ||
            value.label === 'Unknown Task'
          );
        }}
        onChange={handleChange}
        disablePortal
        options={tasklistAsOptions}
        renderOption={(props, option) => {
          if (option.id === 'create-task') {
            return (
              <Box
                component={'li'}
                {...props}
                onClick={() => {
                  true;
                }}
                key={option.id}
                id={option.id}
              >
                {renderCreateTaskOption()}
              </Box>
            );
          } else {
            return (
              <Box component={'li'} {...props} key={option.id} id={option.id}>
                {option.label}
              </Box>
            );
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
      ></Autocomplete>

      <TaskEditor />
    </Box>
  );
};

//helper function to clean up creation of props list
export const createTaskSelectorProps = (
  label: string,
  value: TaskOption,
  onChange: (value: TaskOption) => void
): TaskSelectorProps => {
  return { label, value, onChange };
};
