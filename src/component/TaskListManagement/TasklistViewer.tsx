import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';
import { TaskCard } from 'component/TaskListManagement/TaskCard';
import { Button, ButtonGroup, createTheme, ThemeProvider } from '@mui/material';

const footerTheme = createTheme({
  palette: {
    primary: {
      main: '#63b7f7',
    },
  },
});

export const TasklistViewer: React.FC = () => {
  const listLength: number = useAppSelector(
    (state) => state.taskCtrl.tasklist.length
  );
  const page: number = useAppSelector((state) => state.taskCtrl.page);
  const dispatch: AppDispatch = useAppDispatch();

  const handleFirstPageClick = () => {
    try {
      dispatch(taskCtrlSlice.actions.firstPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handleLastPageClick = () => {
    try {
      dispatch(taskCtrlSlice.actions.lastPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextPageClick = () => {
    try {
      dispatch(taskCtrlSlice.actions.nextPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrevPageClick = () => {
    try {
      dispatch(taskCtrlSlice.actions.prevPage());
    } catch (e) {
      console.error(e);
    }
  };

  const getTaskCards = () => {
    const taskCards = [];
    for (
      let i = (page - 1) * TASKS_PER_PAGE;
      i < Math.min(page * TASKS_PER_PAGE, listLength);
      i++
    ) {
      taskCards.push(<TaskCard key={i} idx={i} />);
    }
    return taskCards;
  };

  return (
    <div className="task-pane task-viewer" data-testid="tasklist-viewer">
      {listLength !== 0 && <div>{getTaskCards()}</div>}
      <div className={'task-bottom-row'}>
        <ThemeProvider theme={footerTheme}>
          <ButtonGroup variant="contained" disableElevation={true}>
            <Button
              onClick={handleFirstPageClick}
              style={{
                fontSize: '.9em',
                textTransform: 'none',
                width: 'fit-content',
                border: 'none',
              }}
            >
              First
            </Button>
            <Button
              onClick={handlePrevPageClick}
              style={{
                fontSize: '.9em',
                padding: 0,
                maxWidth: '10px',
                border: 'none',
              }}
            >
              {'<'}
            </Button>
            <div className="page-ref">
              {page +
                ' of ' +
                Math.max(Math.ceil(listLength / TASKS_PER_PAGE), 1)}
            </div>
            <Button
              onClick={handleNextPageClick}
              style={{
                fontSize: '.9em',
                padding: 0,
                maxWidth: '10px',
                border: 'none',
              }}
            >
              {'>'}
            </Button>
            <Button
              onClick={handleLastPageClick}
              style={{
                fontSize: '.9em',
                textTransform: 'none',
                width: 'fit-content',
                border: 'none',
              }}
            >
              Last
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  );
};
