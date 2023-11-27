import { TasklistControlPane } from 'component/TaskListManagement/TasklistControlPane';
import { TaskEditor } from 'component/TaskListManagement/TaskEditor';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';
import React from 'react';

export const TasklistMasterPane: React.FC = () => {
  return (
    <div className="tasklist-master-pane" data-testid="tasklist-master-pane">
      <TasklistControlPane />
      <TasklistViewer />
      <TaskEditor />
    </div>
  );
};
