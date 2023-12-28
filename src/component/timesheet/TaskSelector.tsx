import { Autocomplete, Box, TextField } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { selectTaskCtrl } from 'app/slices/taskCtrlSlice';
import { getTaskOptions } from 'helper/functions';
import { TaskOption, TaskSelectorChangeHandler } from 'app/types';
import { NO_TASK_SELECTED } from 'helper/constants';

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
  const tasklistAsOptions = getTaskOptions(
    useAppSelector((state) => selectTaskCtrl(state).tasklist)
  );

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

  return (
    <Autocomplete
      sx={{ mt: '10px' }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id || value.id === '';
      }}
      onChange={handleChange}
      disablePortal
      options={tasklistAsOptions}
      renderOption={(props, option) => {
        return (
          <Box component={'li'} {...props} key={option.id} id={option.id}>
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
    />
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
