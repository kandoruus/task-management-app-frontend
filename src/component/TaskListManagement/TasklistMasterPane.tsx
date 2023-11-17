import { useAppSelector } from 'app/hooks';
import { TasklistControlPane } from 'component/TaskListManagement/TasklistControlPane';
import { TaskEditor } from 'component/TaskListManagement/TaskEditor';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';
import React from 'react';

export const TasklistMasterPane: React.FC = () => {
  const showEditor = useAppSelector((state) => state.taskCtrl.showEditor);
  return (
    <div className="tasklist-master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      {!showEditor && <TasklistViewer />}
      {showEditor && <TaskEditor />}
    </div>
  );
};
