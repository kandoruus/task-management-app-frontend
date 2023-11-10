import React from 'react';
import './App.css';
import { TaskControlPane } from 'component/TaskControlPane';

export function App(): JSX.Element {
  return (
    <div className="App-wrapper">
      <TaskControlPane />
    </div>
  );
}
