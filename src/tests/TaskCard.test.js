import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import {
  initialTaskCtrlState,
  taskCtrlSlice,
  deleteTask,
} from 'app/taskCtrlSlice';
import { initialTaskEditorState, taskEditorSlice } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'tests/testUtils';
import { setupStore } from 'app/store';
import { TaskCard } from 'component/TaskListManagement/TaskCard';

describe('TaskCard', () => {
  const mockedList = getMockTasklist(1);
  const expectedData = mockedList[0].data;
  const expectedId = mockedList[0]._id;
  const store = {
    ...setupStore({
      taskCtrl: { ...initialTaskCtrlState, tasklist: mockedList },
      taskEditor: initialTaskEditorState,
    }),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    renderWithProviders(<TaskCard idx={0} />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });
  it('renders with three buttons: task-button, task-save, and task-delete', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(
      buttons.find((button) => button.name === 'task-button-0')
    ).not.toBeUndefined();
    expect(
      buttons.find((button) => button.name === 'task-delete-0')
    ).not.toBeUndefined();
  });
  it("displays the task's name as the task-button's text", () => {
    expect(screen.getByText(expectedData.name)).toBeInTheDocument();
  });
  it('dispatches the loadTaskData and openEditor actions when the task-button is clicked', () => {
    const taskButton = screen
      .getAllByRole('button')
      .find((button) => button.name === 'task-button-0');
    fireEvent.click(taskButton);
    expect(store.dispatch).toHaveBeenCalledWith(
      taskCtrlSlice.actions.openEditor()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      taskEditorSlice.actions.loadTaskData({ data: expectedData, indx: 0 })
    );
  });
  it('dispatches the deleteTask action when the task-delete button is clicked', () => {
    const taskDelete = screen
      .getAllByRole('button')
      .find((button) => button.name === 'task-delete-0');
    fireEvent.click(taskDelete);
    expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
      deleteTask({ index: 0, taskId: expectedId }).toString()
    );
  });
});
