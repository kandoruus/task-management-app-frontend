import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { createNewTask, initialTaskCtrlState } from 'app/slices/taskCtrlSlice';
import { initialTaskEditorState } from 'app/slices/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'helper/testUtils';
import { TasklistControlPane } from '../TasklistControlPane';
import { setupStore } from 'app/store';

describe('TasklistControlPane', () => {
  const mockedList = getMockTasklist(2);
  const store = {
    ...setupStore({
      taskCtrl: {
        ...initialTaskCtrlState,
        tasklist: mockedList,
      },
      taskEditor: initialTaskEditorState,
    }),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    renderWithProviders(<TasklistControlPane />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });
  it('renders the toolbar and menu button', () => {
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /menu-btn/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(1);
    expect(screen.queryByText('Create Task')).toBeNull();
  });
  it('opens the menu when the menu button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /menu-btn/i }));
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });
  describe('when the menu button is clicked', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByRole('button', { name: /menu-btn/i }));
    });
    it('dispatches the createNewTask, loadTaskData, and openEditor actions when the Create Task button is clicked.', () => {
      fireEvent.click(screen.getByText('Create Task'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        createNewTask(store.dispatch).toString()
      );
    });
  });
});
