import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import {
  initialTaskCtrlState,
  taskCtrlSlice,
  deleteTask,
  saveOneTask,
} from 'app/taskCtrlSlice';
import { initialTaskEditorState, taskEditorSlice } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'tests/testUtils';
import { TaskEditor } from 'component/TaskListManagement/TaskEditor';
import { setupStore } from 'app/store';

describe('TaskEditor', () => {
  it('has a name field, a description field, a status field, a priority field, a cancel button, a delete button, a save button, and a save and exit button.', () => {
    renderWithProviders(<TaskEditor />);
    //has a name and a description field
    const textboxes = screen
      .getAllByRole('textbox')
      .map((textbox) => textbox.name);
    expect(textboxes.length).toEqual(2);
    expect(textboxes.indexOf('name')).not.toEqual(-1);
    expect(textboxes.indexOf('description')).not.toEqual(-1);
    //has a status field and a priority field
    const comboboxes = screen
      .getAllByRole('combobox')
      .map((combobox) => combobox.id);
    expect(comboboxes.length).toEqual(2);
    expect(comboboxes.indexOf('task-status')).not.toEqual(-1);
    expect(comboboxes.indexOf('task-prio')).not.toEqual(-1);
    // has a cancel button, a delete button, a save button, and a save and exit button.
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Save and Exit')).toBeInTheDocument();
  });
  it('displays the expect data in each field', () => {
    const mockedList = getMockTasklist(1);
    const expectedData = mockedList[0].data;
    renderWithProviders(<TaskEditor />, {
      preloadedState: {
        taskCtrl: initialTaskCtrlState,
        taskEditor: {
          data: expectedData,
          indexOfFocus: 0,
        },
      },
    });
    // test that the textboxes display the proper values for name and description
    const textboxes = screen
      .getAllByRole('textbox')
      .map((textbox) => textbox.value);
    expect(textboxes.indexOf(expectedData.name)).not.toEqual(-1);
    expect(textboxes.indexOf(expectedData.description)).not.toEqual(-1);
    // test that the comboboxes display the proper values for name and description
    expect(screen.getByText(expectedData.status)).toBeInTheDocument();
    expect(screen.getByText(expectedData.priority)).toBeInTheDocument();
  });
  it('dispatches the closeEditor and the clearTaskData actions when the Cancel button is clicked', () => {
    const store = { ...setupStore(), dispatch: jest.fn() };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.click(screen.getByText('Cancel'));
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.closeEditor()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.clearTaskData()
    );
  });
  it('dispatches the closeEditor, clearTaskData, and deleteTask actions when the Delete button is clicked', () => {
    const store = {
      ...setupStore({
        taskCtrl: { ...initialTaskCtrlState, tasklist: getMockTasklist(1) },
        taskEditor: { ...initialTaskEditorState, indexOfFocus: 0 },
      }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.click(screen.getByText('Delete'));
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.closeEditor()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.clearTaskData()
    );
    expect(store.dispatch.mock.calls[2][0].toString()).toEqual(
      deleteTask().toString()
    );
  });
  it('dispatches the updateTaskData and saveOneTask actions when the Save button is clicked', () => {
    const mockedTaskList = getMockTasklist(1);
    const store = {
      ...setupStore({
        taskCtrl: { ...initialTaskCtrlState, tasklist: mockedTaskList },
        taskEditor: { ...initialTaskEditorState, indexOfFocus: 0 },
      }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.click(screen.getByText('Save'));
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.updateTaskData({
        data: { ...initialTaskEditorState.data },
        indx: 0,
      })
    );
    expect(store.dispatch.mock.calls[1][0].toString()).toEqual(
      saveOneTask({
        ...mockedTaskList[0],
        data: { ...initialTaskEditorState.data },
      }).toString()
    );
  });
  it('dispatches the closeEditor, updateTaskData, and clearTaskData actions when the Save and Exit button is clicked', () => {
    const mockedTaskList = getMockTasklist(1);
    const store = {
      ...setupStore({
        taskCtrl: { ...initialTaskCtrlState, tasklist: mockedTaskList },
        taskEditor: { ...initialTaskEditorState, indexOfFocus: 0 },
      }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.click(screen.getByText('Save and Exit'));
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.closeEditor()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.updateTaskData({
        data: { ...initialTaskEditorState.data },
        indx: 0,
      })
    );
    expect(store.dispatch.mock.calls[2][0].toString()).toEqual(
      saveOneTask({
        ...mockedTaskList[0],
        data: { ...initialTaskEditorState.data },
      }).toString()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.clearTaskData()
    );
  });
  it('dispatches the updateName action on change to the name input field', () => {
    const store = { ...setupStore(), dispatch: jest.fn() };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.change(
      screen.getAllByRole('textbox').find((textbox) => textbox.name === 'name'),
      {
        target: { value: 'New Name' },
      }
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.updateName('New Name')
    );
  });
  it('dispatches the updateDescription action on change to the name description input field', () => {
    const store = { ...setupStore(), dispatch: jest.fn() };
    renderWithProviders(<TaskEditor />, { store });
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
    const store = { ...setupStore(), dispatch: jest.fn() };
    renderWithProviders(<TaskEditor />, { store });
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
    const store = { ...setupStore(), dispatch: jest.fn() };
    renderWithProviders(<TaskEditor />, { store });
    fireEvent.mouseDown(
      screen
        .getAllByRole('combobox')
        .find((combobox) => combobox.id === 'task-prio')
    );
    fireEvent.click(screen.getByText('Medium'));
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.updatePriority('Medium')
    );
  });
});
