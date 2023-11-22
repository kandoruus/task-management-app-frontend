import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import {
  initialTaskCtrlState,
  taskCtrlSlice,
  deleteTask,
} from 'app/taskCtrlSlice';
import { initialTaskEditorState, taskEditorSlice } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'tests/testUtils';
import { TaskEditor } from 'component/TaskListManagement/TaskEditor';
import { setupStore } from 'app/store';
import { TaskCard } from 'component/TaskListManagement/TaskCard';

describe('TaskCard', () => {
  it('renders with three buttons: task-button, task-save, and task-delete', () => {
    renderWithProviders(<TaskCard idx={0} />, {
      preloadedState: {
        taskCtrl: { ...initialTaskCtrlState, tasklist: getMockTasklist(1) },
        taskEditor: initialTaskEditorState,
      },
    });
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(
      buttons.find((button) => button.name === 'task-button-0')
    ).not.toBeUndefined();
    expect(
      buttons.find((button) => button.name === 'task-save-0')
    ).not.toBeUndefined();
    expect(
      buttons.find((button) => button.name === 'task-delete-0')
    ).not.toBeUndefined();
  }); /*
  it("displays the task's name as the task-button's text", () => {
    renderWithProviders(<TaskCard idx={0} />);
    expect(true).toBeFalsy;
  }); /*
  it('dispatches the loadTaskData and openEditor actions when the task-button is clicked', () => {
    renderWithProviders(<TaskCard idx={0} />);
    expect(true).toBeFalsy;
  });/*
  it('dispatches the deleteTask action when the task-delete button is clicked', () => {
    renderWithProviders(<TaskCard idx={0} />);
    expect(true).toBeFalsy;
  });/*
  it('dispatches the saveOneTask action when the task-save button is clicked', () => {
    renderWithProviders(<TaskCard idx={0} />);
    expect(true).toBeFalsy;
  });*/
});
