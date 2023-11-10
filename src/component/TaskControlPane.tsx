import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const TaskControlPane: React.FC = () => {
  const [willDataLoad, setWillDataLoad] = useState(false);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [taskList, setTaskList] = useState([]);

  function onLoadTasksClick() {
    setWillDataLoad(true);
  }

  async function loadTasks() {
    const tasksJSON = (await axios.get('http://localhost:3001/api/tasklist'))
      .data;
    setTaskList(tasksJSON);
    setHasDataLoaded(true);
  }

  useEffect(() => {
    if (willDataLoad && !hasDataLoaded) loadTasks().catch(alert);
  }, [willDataLoad]);

  return (
    <div className="task-control-pane">
      <div>{String(hasDataLoaded)}</div>
      <div>{String(taskList.length)}</div>
      <button onClick={onLoadTasksClick}>Load Tasks</button>
      <button>View a Task</button>
      <button>Delete a Task</button>
    </div>
  );
};
