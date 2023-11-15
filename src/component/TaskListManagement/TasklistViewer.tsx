import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { loadTaskData } from 'app/taskEditorSlice';
import { Tasklist } from 'app/types';
import React from 'react';

export const TasklistViewer: React.FC = () => {
  const tasks: Tasklist = useAppSelector((state) => state.taskCtrl.tasklist);
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
  return (
    <div className="task-pane task-viewer">
      {tasks.length !== 0 && (
        <div>
          {tasks.map((task, idx) => (
            <button
              className="task-button"
              key={idx}
              id={idx.toString()}
              onClick={handleClick}
            >
              {task.data.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
