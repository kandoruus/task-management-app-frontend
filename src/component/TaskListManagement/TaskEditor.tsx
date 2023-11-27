import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, saveOneTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';
import { priorityOptions, statusOptions } from 'helper/componentConfig';
import React from 'react';

export const TaskEditor: React.FC = () => {
  const showEditor = useAppSelector((state) => state.taskCtrl.showEditor);
  const { data, indexOfFocus } = useAppSelector((state) => state.taskEditor);
  const { name, description, priority, status } = data;
  const task = useAppSelector(
    (state) => state.taskCtrl.tasklist[indexOfFocus as number]
  );
  const dispatch: AppDispatch = useAppDispatch();

  const saveTask = () => {
    const indexToSave = indexOfFocus;
    const taskToSave = { ...task, data: { ...data } };
    if (indexToSave === null) {
      throw new Error('Index of task is null');
    } else if (name.trim() === '') {
      window.alert('Task name cannot be blank');
    } else {
      dispatch(
        taskCtrlSlice.actions.updateTaskData({
          data: { ...taskToSave.data },
          indx: indexToSave,
        })
      );
      dispatch(saveOneTask(taskToSave));
    }
  };
  const exitEditor = () => {
    dispatch(taskCtrlSlice.actions.closeEditor());
    dispatch(taskEditorSlice.actions.clearTaskData());
  };

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      exitEditor();
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
    try {
      saveTask();
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      saveTask();
      exitEditor();
    } catch (e) {
      console.error(e);
    }
  };
  const handleEditorModalClose = () => {
    try {
      exitEditor();
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
  const handleStatusInput = (event: SelectChangeEvent<string>) => {
    dispatch(taskEditorSlice.actions.updateStatus(event.target.value));
  };
  const handlePriorityInput = (event: SelectChangeEvent<string>) => {
    dispatch(taskEditorSlice.actions.updatePriority(event.target.value));
  };

  return (
    <Modal open={showEditor} onClose={handleEditorModalClose}>
      <Box className="task-pane task-editor" data-testid="task-editor">
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
          id="task-priority"
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
        <ButtonGroup variant="contained">
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleDeleteClick}>Delete</Button>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleSaveExitClick}>Save and Exit</Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};
