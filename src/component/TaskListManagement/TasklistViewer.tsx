import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';
import { TaskCard } from 'component/TaskListManagement/TaskCard';

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
        <button onClick={handleFirstPageClick}>First</button>
        <button onClick={handlePrevPageClick}>{'<'}</button>
        <div>
          {page + ' of ' + Math.max(Math.ceil(listLength / TASKS_PER_PAGE), 1)}
        </div>
        <button onClick={handleNextPageClick}>{'>'}</button>
        <button onClick={handleLastPageClick}>Last</button>
      </div>
    </div>
  );
};
