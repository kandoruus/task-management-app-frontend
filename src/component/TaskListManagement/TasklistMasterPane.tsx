import { useAppSelector } from 'app/hooks';
import { TasklistControlPane } from 'component/TaskListManagement/TasklistControlPane';
import { TasklistEditor } from 'component/TaskListManagement/TasklistEditor';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';
import React from 'react';

export const TasklistMasterPane: React.FC = () => {
  const showEditor = useAppSelector((state) => state.taskCtrl.showEditor);
  return (
    <div className="tasklist-master-pane">
      <TasklistControlPane />
      {!showEditor && <TasklistViewer />}
      {showEditor && <TasklistEditor />}
    </div>
  );
};
