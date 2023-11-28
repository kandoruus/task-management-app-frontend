import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { tasklistCtrlBtns } from 'helper/componentConfig';
import { Tasklist } from 'app/types';
import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  openEditor,
} from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';
import {
  NEW_TASK_DATA,
  SAVE_ALL_TASKS_API,
  SAVE_TASK_HEADERS,
} from 'helper/constants';
import axios from 'axios';
import { Box, Button, ButtonGroup } from '@mui/material';

export const TasklistControlPane: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const tasklist: Tasklist = useAppSelector((state) => state.taskCtrl.tasklist);
  const handleClick: ((event: React.MouseEvent<HTMLButtonElement>) => void)[] =
    [
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          dispatch(fetchTasklist());
        } catch (e) {
          console.error(e);
        }
      },
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          dispatch(deleteTasklist());
        } catch (e) {
          console.error(e);
        }
      },
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          await axios.post(
            SAVE_ALL_TASKS_API,
            {
              tasklist: JSON.stringify(tasklist),
            },
            SAVE_TASK_HEADERS
          );
        } catch (e) {
          console.error(e);
        }
      },
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          const indexOfNewTask = tasklist.length;
          dispatch(createNewTask(dispatch));
          dispatch(
            loadTaskData({
              data: { ...NEW_TASK_DATA },
              indx: indexOfNewTask,
            })
          );
          dispatch(openEditor());
        } catch (e) {
          console.error(e);
        }
      },
    ];

  return (
    <Box className="tasklist-control-pane" data-testid="tasklist-control-pane">
      <ButtonGroup variant="contained" color="primary" fullWidth={true}>
        {tasklistCtrlBtns.map((button) => (
          <Button
            id={button.id}
            onClick={handleClick[button.handleClickIdx]}
            value={button.value}
            key={button.id}
            style={{ padding: 2, maxHeight: '30px', whiteSpace: 'nowrap' }}
          >
            {button.value}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};