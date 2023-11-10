import React from 'react';
import './App.css';
import { TasklistMasterPane } from 'component/TaskListManagement/TasklistMasterPane';

export function App(): JSX.Element {
  return (
    <div className="App-wrapper">
      <TasklistMasterPane />
    </div>
  );
}
