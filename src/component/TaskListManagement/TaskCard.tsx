import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, saveOneTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';
import { Task } from 'app/types';
import React from 'react';

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

  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      dispatch(saveOneTask(task));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={'task-card'} key={props.idx}>
      <button
        className="task-button"
        id={props.idx.toString()}
        name={'task-button-' + props.idx}
        onClick={handleClick}
      >
        {task.data.name}
      </button>
      <button
        className="task-save"
        onClick={handleSaveClick}
        id={props.idx.toString()}
        name={'task-save-' + props.idx}
      >
        <FontAwesomeIcon icon={faSave} />
      </button>
      <button
        className="task-delete"
        onClick={handleDeleteClick}
        id={props.idx.toString()}
        name={'task-delete-' + props.idx}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
