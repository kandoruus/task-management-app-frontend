import { useAppSelector } from 'app/hooks';
import { Tasklist } from 'app/types';
import React from 'react';

export const TasklistViewer: React.FC = () => {
  const tasks: Tasklist = useAppSelector((state) => state.taskCtrl.tasklist);
  return (
    <div>
      {tasks.length !== 0 && (
        <div>
          {tasks.map((task, idx) => (
            <button key={'task' + idx}>{task.data.name}</button>
          ))}
        </div>
      )}
    </div>
  );
};
