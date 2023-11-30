import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector, useModal } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { deleteTask, saveOneTask, taskCtrlSlice } from 'app/taskCtrlSlice';
import { taskEditorSlice } from 'app/taskEditorSlice';
import { YesNoDialog } from '../../../../../helper-components/YesNoDialog/YesNoDialog';
import { priorityOptions, statusOptions } from 'helper/componentConfig';
import { ERR_MSG_BLANK_NAME, POP_MSG_QUERY_SAVE } from 'helper/constants';
import React from 'react';
import './TaskEditor.css';

export const TaskEditor: React.FC = () => {
  const [alertIsOpen, toggleAlert] = useModal();
  const [queryIsOpen, toggleQuery] = useModal();
  const showEditor = useAppSelector((state) => state.taskCtrl.showEditor);
  const { data, indexOfFocus } = useAppSelector((state) => state.taskEditor);
  const { name, description, priority, status } = data;
  const task = useAppSelector(
    (state) => state.taskCtrl.tasklist[indexOfFocus as number]
  );
  const dispatch: AppDispatch = useAppDispatch();

  const saveTask = (): boolean => {
    const indexToSave = indexOfFocus as number;
    const taskToSave = { ...task, data: { ...data } };
    const nameIsBlank = name.trim() === '';
    if (nameIsBlank) {
      toggleAlert();
    } else {
      dispatch(
        taskCtrlSlice.actions.updateTaskData({
          data: { ...taskToSave.data },
          indx: indexToSave,
        })
      );
      dispatch(saveOneTask(taskToSave));
    }
    return !nameIsBlank;
  };
  const exitEditor = () => {
    dispatch(taskCtrlSlice.actions.closeEditor());
    dispatch(taskEditorSlice.actions.clearTaskData());
  };
  const saveAndExit = () => {
    if (saveTask()) exitEditor();
  };
  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    exitEditor();
  };
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const indexToDelete = indexOfFocus as number;
    dispatch(deleteTask({ index: indexToDelete, taskId: task._id }));
    exitEditor();
  };
  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveTask();
  };
  const handleSaveExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveAndExit();
  };
  const handleExitPopUpResponse = (saveBeforeExit: boolean) => {
    if (saveBeforeExit) {
      saveAndExit();
    } else {
      exitEditor();
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
    <Modal open={showEditor} onClose={toggleQuery} data-testid="task-editor">
      <Box className="task-editor">
        <Box className="input-wrapper">
          <TextField
            id="task-name"
            type="text"
            name="name"
            placeholder="name"
            required
            value={name}
            onChange={handleNameInput}
          />
          <TextField
            className="task-editor-desc"
            id="task-desc"
            name="description"
            placeholder="description"
            value={description}
            onChange={handleDescriptionInput}
            multiline
            rows={8}
          />
          <Select id="task-status" value={status} onChange={handleStatusInput}>
            {statusOptions.map((option: string) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
          <Select
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
        </Box>
        <ButtonGroup variant="contained" className="task-editor-btns">
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleDeleteClick} color="error">
            Delete
          </Button>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleSaveExitClick}>Save and Exit</Button>
        </ButtonGroup>
        <YesNoDialog
          open={queryIsOpen}
          closeDialog={toggleQuery}
          question={POP_MSG_QUERY_SAVE}
          response={handleExitPopUpResponse}
        />
        <Dialog open={alertIsOpen}>
          <DialogTitle>{ERR_MSG_BLANK_NAME}</DialogTitle>
          <DialogActions>
            <Button onClick={toggleAlert}>Okay</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};
