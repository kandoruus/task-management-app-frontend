import { DeleteTwoTone } from '@mui/icons-material';
import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, taskCtrlSlice } from 'app/slices/taskCtrlSlice';
import { loadTaskData } from 'app/slices/taskEditorSlice';
import { Task } from 'app/types';
import React from 'react';
import './TaskCard.css';

interface TaskCardProps {
  idx: number;
}

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const task: Task = useAppSelector(
    (state) => state.taskCtrl.tasklist[props.idx]
  );
  const dispatch: AppDispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const indx = +(event.target as HTMLButtonElement).id;
      dispatch(
        loadTaskData({
          data: task.data,
          indx,
        })
      );
      dispatch(taskCtrlSlice.actions.openEditor());
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const indx = +(event.target as HTMLButtonElement).id;
      dispatch(deleteTask({ index: indx, taskId: task._id }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TableRow className="task-card">
      <TableCell className="info-cell">
        <Button
          className="task-button"
          id={props.idx.toString()}
          name={'task-button-' + props.idx}
          onClick={handleClick}
          sx={{ color: 'common.black' }}
        >
          {task.data.name}
        </Button>
      </TableCell>
      <TableCell className="delete-cell">
        <IconButton
          className="task-delete"
          onClick={handleDeleteClick}
          id={props.idx.toString()}
          name={'task-delete-' + props.idx}
          color="error"
        >
          <DeleteTwoTone className="delete-icon" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
