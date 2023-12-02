import React, { useState } from 'react';
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
  AXIOS_HEADERS,
} from 'helper/constants';
import axios from 'axios';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './TasklistControlPane.css';

export const TasklistControlPane: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const tasklist: Tasklist = useAppSelector((state) => state.taskCtrl.tasklist);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const handleClick: (() => void)[] = [
    () => {
      handleMenuClose();
      try {
        dispatch(fetchTasklist());
      } catch (e) {
        console.error(e);
      }
    },
    () => {
      handleMenuClose();
      try {
        dispatch(deleteTasklist());
      } catch (e) {
        console.error(e);
      }
    },
    async () => {
      handleMenuClose();
      try {
        await axios.post(
          SAVE_ALL_TASKS_API,
          {
            tasklist: JSON.stringify(tasklist),
          },
          AXIOS_HEADERS
        );
      } catch (e) {
        console.error(e);
      }
    },
    async () => {
      handleMenuClose();
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

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box className="tasklist-control-pane" data-testid="tasklist-control-pane">
      <Toolbar variant="dense" sx={{ minHeight: '34px', width: '100%' }}>
        <IconButton
          data-testid="tasklist-menu-btn"
          size="small"
          edge="start"
          className="menu-icon"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
          {tasklistCtrlBtns.map((button) => (
            <MenuItem
              id={button.id}
              onClick={handleClick[button.handleClickIdx]}
              value={button.value}
              key={button.id}
            >
              {button.value}
            </MenuItem>
          ))}
        </Menu>
        <Typography noWrap variant="h6">
          Tasks
        </Typography>
      </Toolbar>
    </Box>
  );
};
