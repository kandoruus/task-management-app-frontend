import * as React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import {
  initialTaskCtrlState,
  taskCtrlSlice,
  deleteTask,
  saveOneTask,
} from 'app/slices/taskCtrlSlice';
import {
  initialTaskEditorState,
  taskEditorSlice,
} from 'app/slices/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'helper/testUtils';
import { TaskEditor } from '../TaskEditor';
import { setupStore } from 'app/store';
import { POP_MSG, ERR_MSG } from 'helper/constants';

describe('TaskEditor', () => {
  const mockedList = getMockTasklist(1);
  const expectedData = mockedList[0].data;
  describe('With valid task data', () => {
    const store = {
      ...setupStore({
        taskCtrl: {
          ...initialTaskCtrlState,
          showEditor: true,
          tasklist: mockedList,
        },
        taskEditor: {
          ...initialTaskEditorState,
          data: { ...expectedData },
          indexOfFocus: 0,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<TaskEditor />, { store });
    });
    afterEach(() => {
      store.dispatch.mockClear();
    });
    it('has a name field, a description field, a status field, a priority field, a cancel button, a delete button, a save button, and a save and exit button.', () => {
      //Has a Name
      expect(screen.getByText(expectedData.name)).toBeInTheDocument();
      //has a description field
      const textboxes = screen
        .getAllByRole('textbox')
        .map((textbox) => textbox.name);
      expect(textboxes.length).toEqual(1);
      expect(textboxes.indexOf('description')).not.toEqual(-1);
      //has a status field and a priority field
      const comboboxes = screen
        .getAllByRole('combobox')
        .map((combobox) => combobox.id);
      expect(comboboxes.length).toEqual(2);
      expect(comboboxes.indexOf('task-status')).not.toEqual(-1);
      expect(comboboxes.indexOf('task-priority')).not.toEqual(-1);
      // has a cancel button, a delete button, a save button, and a save and exit button.
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Save and Exit')).toBeInTheDocument();
    });
    it('displays the expect data in each field', () => {
      // test that the textbox display the proper values for description
      const textboxes = screen
        .getAllByRole('textbox')
        .map((textbox) => textbox.value);
      expect(textboxes.indexOf(expectedData.description)).not.toEqual(-1);
      // test that the comboboxes display the proper values for status and priority
      expect(screen.getByText(expectedData.status)).toBeInTheDocument();
      expect(screen.getByText(expectedData.priority)).toBeInTheDocument();
    });
    it('dispatches the closeEditor and the clearTaskData actions when the Cancel button is clicked', () => {
      fireEvent.click(screen.getByText('Cancel'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.closeEditor()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.clearTaskData()
      );
    });
    it('dispatches the closeEditor, clearTaskData, and deleteTask actions when the Delete button is clicked', () => {
      fireEvent.click(screen.getByText('Delete'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.closeEditor()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.clearTaskData()
      );
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        deleteTask().toString()
      );
    });
    it('dispatches the updateTaskData and saveOneTask actions when the Save button is clicked', () => {
      fireEvent.click(screen.getByText('Save'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.updateTaskData({
          data: { ...expectedData },
          indx: 0,
        })
      );
      expect(store.dispatch.mock.calls[1][0].toString()).toEqual(
        saveOneTask(mockedList[0]).toString()
      );
    });
    it('dispatches the saveOneTask, closeEditor, updateTaskData, and clearTaskData actions when the Save and Exit button is clicked', () => {
      fireEvent.click(screen.getByText('Save and Exit'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.updateTaskData({
          data: { ...expectedData },
          indx: 0,
        })
      );
      expect(store.dispatch.mock.calls[1][0].toString()).toEqual(
        saveOneTask(mockedList[0]).toString()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.closeEditor()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.clearTaskData()
      );
    });
    it('dispatches the updateDescription action on change to the name description input field', () => {
      fireEvent.change(
        screen
          .getAllByRole('textbox')
          .find((textbox) => textbox.name === 'description'),
        {
          target: { value: 'New description' },
        }
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.updateDescription('New description')
      );
    });
    it('dispatches the updateStatus action on change to the status field', () => {
      fireEvent.mouseDown(
        screen
          .getAllByRole('combobox')
          .find((combobox) => combobox.id === 'task-status')
      );
      fireEvent.click(screen.getByText('In Progress'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.updateStatus('In Progress')
      );
    });
    it('dispatches the updatePriority action on change to the priority field', () => {
      fireEvent.mouseDown(
        screen
          .getAllByRole('combobox')
          .find((combobox) => combobox.id === 'task-priority')
      );
      fireEvent.click(screen.getByText('Medium'));
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.updatePriority('Medium')
      );
    });
    describe('when the name is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText(expectedData.name));
      });
      it('changes to a textbox', () => {
        const textboxes = screen
          .getAllByRole('textbox')
          .map((textbox) => textbox.name);
        expect(textboxes.length).toEqual(2);
        expect(textboxes.indexOf('name')).not.toEqual(-1);
      });
      it('dispatches the updateName action on change to the name input field', () => {
        fireEvent.change(
          screen
            .getAllByRole('textbox')
            .find((textbox) => textbox.name === 'name'),
          {
            target: { value: 'New Name' },
          }
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          taskEditorSlice.actions.updateName('New Name')
        );
      });
    });
    describe('onClose', () => {
      beforeEach(() => {
        fireEvent.keyDown(screen.getByTestId('task-editor'), {
          key: 'Escape',
          code: 'Escape',
        });
      });
      it('displays the correct question', async () => {
        expect(await screen.findByText(POP_MSG.QUERY_SAVE)).toBeInTheDocument();
      });
      it('dispatches the saveOneTask, closeEditor, updateTaskData, and clearTaskData actions when the Yes button is clicked', () => {
        fireEvent.click(screen.getByText('Yes'));
        expect(store.dispatch).toHaveBeenCalledWith(
          taskCtrlSlice.actions.updateTaskData({
            data: { ...expectedData },
            indx: 0,
          })
        );
        expect(store.dispatch.mock.calls[1][0].toString()).toEqual(
          saveOneTask(mockedList[0]).toString()
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          taskCtrlSlice.actions.closeEditor()
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          taskEditorSlice.actions.clearTaskData()
        );
      });
      it('dispatches the closeEditor and the clearTaskData actions when the No button is clicked', () => {
        fireEvent.click(screen.getByText('No'));
        expect(store.dispatch).toHaveBeenCalledWith(
          taskCtrlSlice.actions.closeEditor()
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          taskEditorSlice.actions.clearTaskData()
        );
      });
    });
  });
  describe('With blank task name', () => {
    const store = {
      ...setupStore({
        taskCtrl: {
          ...initialTaskCtrlState,
          showEditor: true,
          tasklist: mockedList,
        },
        taskEditor: {
          ...initialTaskEditorState,
          data: { ...expectedData, name: '' },
          indexOfFocus: 0,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<TaskEditor />, { store });
    });
    afterEach(() => {
      store.dispatch.mockClear();
    });
    it('will display the alert popup and will not dispatch any actions when the save button is clicked', async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(await screen.findByText(ERR_MSG.BLANK_NAME)).toBeInTheDocument();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    it('will display the alert popup and will not dispatch any actions when the save and exit button is clicked', async () => {
      fireEvent.click(screen.getByText('Save and Exit'));
      expect(await screen.findByText(ERR_MSG.BLANK_NAME)).toBeInTheDocument();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    it('will display the alert popup and will not dispatch any actions onClose when the yes button is clicked', async () => {
      fireEvent.keyDown(screen.getByTestId('task-editor'), {
        key: 'Escape',
        code: 'Escape',
      });
      fireEvent.click(await screen.findByText('Yes'));
      expect(await screen.findByText(ERR_MSG.BLANK_NAME)).toBeInTheDocument();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    describe('the alert popup', () => {
      it('closes the alert popup when the okay button is clicked', async () => {
        fireEvent.click(screen.getByText('Save'));
        fireEvent.click(await screen.findByText('Okay'));
        await waitFor(() => {
          expect(screen.queryByText(ERR_MSG.BLANK_NAME)).toBeNull();
        });
      });
    });
  });
});
