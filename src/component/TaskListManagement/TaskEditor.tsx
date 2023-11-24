import {
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, saveOneTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';
import { priorityOptions, statusOptions } from 'helper/componentConfig';
import React from 'react';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#bbdffb',
    },
  },
});

export const TaskEditor: React.FC = () => {
  const { data, indexOfFocus } = useAppSelector((state) => state.taskEditor);
  const { name, description, priority, status } = data;
  const task = useAppSelector(
    (state) => state.taskCtrl.tasklist[indexOfFocus as number]
  );
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
      const indexToDelete = indexOfFocus as number;
      dispatch(taskCtrlSlice.actions.closeEditor());
      dispatch(taskEditorSlice.actions.clearTaskData());
      if (indexToDelete !== null) {
        dispatch(deleteTask({ index: indexToDelete, taskId: task._id }));
      } else {
        throw new Error('Index of task is null');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (name.trim() === '') {
      window.alert('Task name cannot be blank');
    } else {
      try {
        if (indexOfFocus === null) {
          throw new Error('Index of task is null');
        } else {
          const taskToSave = { ...task, data: { ...data } };
          dispatch(
            taskCtrlSlice.actions.updateTaskData({
              data: { ...data },
              indx: indexOfFocus,
            })
          );
          dispatch(saveOneTask(taskToSave));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSaveExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (name.trim() === '') {
      window.alert('Task name cannot be blank');
    } else {
      try {
        const dataToSave = { ...data };
        const indexToSave = indexOfFocus;
        if (indexToSave === null) {
          throw new Error('Index of task is null');
        } else {
          const taskToSave = { ...task, data: { ...data } };
          dispatch(taskCtrlSlice.actions.closeEditor());
          dispatch(
            taskCtrlSlice.actions.updateTaskData({
              data: dataToSave,
              indx: indexToSave,
            })
          );
          dispatch(saveOneTask(taskToSave));
          dispatch(taskEditorSlice.actions.clearTaskData());
        }
      } catch (e) {
        console.error(e);
      }
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
  const handleStatusInput = (event: SelectChangeEvent<string>) => {
    dispatch(taskEditorSlice.actions.updateStatus(event.target.value));
  };
  const handlePriorityInput = (event: SelectChangeEvent<string>) => {
    dispatch(taskEditorSlice.actions.updatePriority(event.target.value));
  };

  return (
    <div className="task-pane task-editor" data-testid="task-editor">
      <TextField
        className="task-editor-input"
        id="task-name"
        type="text"
        name="name"
        placeholder="name"
        required
        value={name}
        onChange={handleNameInput}
      />
      <TextField
        className="task-editor-input"
        id="task-desc"
        name="description"
        placeholder="description"
        value={description}
        onChange={handleDescriptionInput}
        multiline
        rows={8}
      />
      <Select
        className="task-editor-input"
        id="task-status"
        value={status}
        onChange={handleStatusInput}
      >
        {statusOptions.map((option: string) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      <Select
        className="task-editor-input"
        id="task-prio"
        value={priority}
        onChange={handlePriorityInput}
      >
        {priorityOptions.map((option: string) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      <ThemeProvider theme={buttonTheme}>
        <div className="task-editor-btns">
          <ButtonGroup variant="contained">
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={handleSaveExitClick}>Save and Exit</Button>
          </ButtonGroup>
        </div>
      </ThemeProvider>
    </div>
  );
};
