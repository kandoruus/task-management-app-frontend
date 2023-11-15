import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice, saveNewTask } from 'app/taskEditorSlice';
import React from 'react';

export const TasklistEditor: React.FC = () => {
  const { name, description, status, priority } = useAppSelector(
    (state) => state.taskEditor.data
  );

  const dispatch: AppDispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      dispatch(saveNewTask(dispatch));
      dispatch(taskCtrlSlice.actions.closeEditor());
    } catch (e) {
      console.error(e);
    }
  };
  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      taskEditorSlice.actions.updateName(
        (event.target as HTMLInputElement).value
      )
    );
  };
  const handleDescriptionInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      taskEditorSlice.actions.updateDescription(
        (event.target as HTMLInputElement).value
      )
    );
  };
  const handleStatusInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      taskEditorSlice.actions.updateStatus(
        (event.target as HTMLInputElement).value
      )
    );
  };
  const handlePriorityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      taskEditorSlice.actions.updatePriority(
        (event.target as HTMLInputElement).value
      )
    );
  };

  return (
    <div>
      <input
        id="task-name"
        type="text"
        name="name"
        placeholder="name"
        required
        value={name}
        onChange={handleNameInput}
      />
      <input
        id="task-desc"
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={handleDescriptionInput}
      />
      <input
        id="task-status"
        type="text"
        name="status"
        placeholder="status"
        value={status}
        onChange={handleStatusInput}
      />
      <input
        id="task-prio"
        type="text"
        name="priority"
        placeholder="priority"
        value={priority}
        onChange={handlePriorityInput}
      />
      <button onClick={handleClick}>Save New Task</button>
    </div>
  );
};
