import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/slices/taskCtrlSlice';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableRow,
} from '@mui/material';
import 'component/tasks/_styles.css';
import { TaskCard } from 'component/tasks/TaskCard';

export const TasklistViewer: React.FC = () => {
  const listLength: number = useAppSelector(
    (state) => state.taskCtrl.tasklist.length
  );
  const page: number = useAppSelector((state) => state.taskCtrl.page);
  const taskIndexes: number[] = Array(TASKS_PER_PAGE)
    .fill(undefined)
    .map((_, index) => (page - 1) * TASKS_PER_PAGE + index);

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

  return (
    <Box className="task-viewer" data-testid="tasklist-viewer">
      <Box className="tasklist-viewer">
        <Table className="taskcard-table" padding="none" size="small">
          <TableBody>
            {taskIndexes.map((taskIndex) =>
              taskIndex < listLength ? (
                <TaskCard idx={taskIndex} key={taskIndex} />
              ) : (
                <TableRow key={taskIndex} />
              )
            )}
          </TableBody>
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
