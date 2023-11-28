import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';
import { TaskCard } from '../TaskCard/TaskCard';
import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Table,
  TableBody,
  TableRow,
  ThemeProvider,
} from '@mui/material';

const footerTheme = createTheme({
  /*palette: {
    primary: {
      main: '#63b7f7',
    },
  },*/
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
    for (let i = (page - 1) * TASKS_PER_PAGE; i < page * TASKS_PER_PAGE; i++) {
      if (i < listLength) {
        taskCards.push(<TaskCard key={i} idx={i} />);
      } else {
        <TableRow />;
      }
    }
    return taskCards;
  };

  return (
    <Box className="task-pane task-viewer" data-testid="tasklist-viewer">
      <Table className="tasklist-viewer" padding="none" size="small">
        <TableBody>{getTaskCards()}</TableBody>
      </Table>
      <Box className={'task-bottom-row'}>
        <ThemeProvider theme={footerTheme}>
          <ButtonGroup variant="contained" disableElevation={true}>
            <Button onClick={handleFirstPageClick} className="footer-btn">
              First
            </Button>
            <Button
              onClick={handlePrevPageClick}
              className="footer-btn arrow-btn"
            >
              {'<'}
            </Button>
            <Box className="page-ref">
              {page +
                ' of ' +
                Math.max(Math.ceil(listLength / TASKS_PER_PAGE), 1)}
            </Box>
            <Button
              onClick={handleNextPageClick}
              className="footer-btn arrow-btn"
            >
              {'>'}
            </Button>
            <Button onClick={handleLastPageClick} className="footer-btn">
              Last
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </Box>
    </Box>
  );
};
