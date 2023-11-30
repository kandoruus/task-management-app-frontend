import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';
import { TaskCard } from './TaskCard/TaskCard';
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableRow,
} from '@mui/material';
import './TasklistViewer.css';

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
        taskCards.push(<TaskCard idx={i} key={i} />);
      } else {
        taskCards.push(<TableRow key={i} />);
      }
    }
    return taskCards;
  };

  return (
    <Box className="task-viewer" data-testid="tasklist-viewer">
      <Box className="tasklist-viewer">
        <Table className="taskcard-table" padding="none" size="small">
          <TableBody>{getTaskCards()}</TableBody>
        </Table>
      </Box>
      <Box className={'tasklist-footer'}>
        <ButtonGroup>
          <Button onClick={handleFirstPageClick} className="footer-btn">
            First
          </Button>
          <Button onClick={handlePrevPageClick} className="footer-btn">
            {'<'}
          </Button>
          <Button className="page-ref footer-btn" disableRipple>
            {page +
              ' of ' +
              Math.max(Math.ceil(listLength / TASKS_PER_PAGE), 1)}
          </Button>
          <Button onClick={handleNextPageClick} className="footer-btn">
            {'>'}
          </Button>
          <Button onClick={handleLastPageClick} className="footer-btn">
            Last
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
