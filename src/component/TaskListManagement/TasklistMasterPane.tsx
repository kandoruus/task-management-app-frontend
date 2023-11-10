import { TasklistControlPane } from 'component/TaskListManagement/TasklistControlPane';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';
import React from 'react';

export const TasklistMasterPane: React.FC = () => {
  return (
    <div className="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
    </div>
  );
};
