import { DeleteTwoTone } from '@mui/icons-material';
import { Button, ButtonGroup, ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';
import { Task } from 'app/types';
import React from 'react';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#bbdffb',
    },
    secondary: {
      main: '#90cbf9',
    },
    error: {
      main: '#ef9a9a',
    },
  },
});

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
    <div className={'task-card'} key={props.idx}>
      <ThemeProvider theme={lightTheme}>
        <ButtonGroup
          variant="contained"
          disableElevation={true}
          style={{ width: '100%' }}
        >
          <Button
            className="task-button"
            id={props.idx.toString()}
            name={'task-button-' + props.idx}
            onClick={handleClick}
            style={{
              width: '95%',
              paddingLeft: '15px',
              justifyContent: 'flex-start',
              textTransform: 'none',
            }}
          >
            {task.data.name}
          </Button>
          <Button
            className="task-delete"
            onClick={handleDeleteClick}
            id={props.idx.toString()}
            name={'task-delete-' + props.idx}
            style={{ width: '5%' }}
            color="error"
          >
            <DeleteTwoTone style={{ fontSize: '1.3rem' }} />
          </Button>
        </ButtonGroup>
      </ThemeProvider>
    </div>
  );
};
