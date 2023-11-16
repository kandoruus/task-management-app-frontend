import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, saveOneTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';
import { Tasklist } from 'app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { TASKS_PER_PAGE } from 'helper/constants';

export const TasklistViewer: React.FC = () => {
  const tasks: Tasklist = useAppSelector((state) => state.taskCtrl.tasklist);
  const page: number = useAppSelector((state) => state.taskCtrl.page);
  const dispatch: AppDispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const indx = +(event.target as HTMLButtonElement).id;
      dispatch(
        loadTaskData({
          data: tasks[indx].data,
          indx,
        })
      );
      dispatch(taskCtrlSlice.actions.openEditor());
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const indx = +(event.target as HTMLButtonElement).id;
      dispatch(deleteTask(indx));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const indx = +(event.target as HTMLButtonElement).id;
      dispatch(saveOneTask(tasks[indx]));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFirstPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(taskCtrlSlice.actions.firstPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handleLastPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(taskCtrlSlice.actions.lastPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(taskCtrlSlice.actions.nextPage());
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrevPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(taskCtrlSlice.actions.prevPage());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="task-pane task-viewer">
      {tasks.length !== 0 && (
        <div>
          {tasks
            .slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE)
            .map((task, idx) => (
              <div
                className={'task-row'}
                key={idx + (page - 1) * TASKS_PER_PAGE}
              >
                <button
                  className="task-button"
                  id={(idx + (page - 1) * TASKS_PER_PAGE).toString()}
                  onClick={handleClick}
                >
                  {task.data.name}
                </button>
                <button
                  className="task-save"
                  onClick={handleSaveClick}
                  id={(idx + (page - 1) * TASKS_PER_PAGE).toString()}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="task-delete"
                  onClick={handleDeleteClick}
                  id={(idx + (page - 1) * TASKS_PER_PAGE).toString()}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
        </div>
      )}
      <div className={'task-bottom-row'}>
        <button onClick={handleFirstPageClick}>First</button>
        <button onClick={handlePrevPageClick}>{'<'}</button>
        <div>
          {page +
            ' of ' +
            Math.max(Math.ceil(tasks.length / TASKS_PER_PAGE), 1)}
        </div>
        <button onClick={handleNextPageClick}>{'>'}</button>
        <button onClick={handleLastPageClick}>Last</button>
      </div>
    </div>
  );
};
