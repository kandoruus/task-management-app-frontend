import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';
import React from 'react';

export const TasklistEditor: React.FC = () => {
  const { data, indexOfFocus } = useAppSelector((state) => state.taskEditor);
  const { name, description, priority, status } = data;

  const dispatch: AppDispatch = useAppDispatch();

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      dispatch(taskCtrlSlice.actions.closeEditor());
      dispatch(taskEditorSlice.actions.clearTaskData());
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const indexToDelete = indexOfFocus;
      dispatch(taskCtrlSlice.actions.closeEditor());
      dispatch(taskEditorSlice.actions.clearTaskData());
      if (indexToDelete) {
        dispatch(deleteTask(indexToDelete));
      } else {
        throw new Error('Index of task is null');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (indexOfFocus === null) {
        throw new Error('Index of task is null');
      } else {
        dispatch(
          taskCtrlSlice.actions.updateTaskData({
            data: { ...data },
            indx: indexOfFocus,
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const dataToSave = { ...data };
      const indexToSave = indexOfFocus;
      if (indexToSave === null) {
        throw new Error('Index of task is null');
      } else {
        dispatch(taskCtrlSlice.actions.closeEditor());
        dispatch(
          taskCtrlSlice.actions.updateTaskData({
            data: dataToSave,
            indx: indexToSave,
          })
        );
        dispatch(taskEditorSlice.actions.clearTaskData());
      }
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
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      taskEditorSlice.actions.updateDescription(
        (event.target as HTMLTextAreaElement).value
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
    <div className="task-pane task-editor">
      <input
        id="task-name"
        type="text"
        name="name"
        placeholder="name"
        required
        value={name}
        onChange={handleNameInput}
      />
      <textarea
        className="task-desc"
        id="task-desc"
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
      <div className="task-editor-btns">
        <button onClick={handleCancelClick}>Cancel</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleSaveExitClick}>Save and Exit</button>
      </div>
    </div>
  );
};
