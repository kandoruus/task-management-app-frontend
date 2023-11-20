import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { initialTaskCtrlState } from 'app/taskCtrlSlice';
import { initialTaskEditorState } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'tests/testUtils';
import { TasklistControlPane } from 'component/TaskListManagement/TasklistControlPane';
import axios from 'axios';
import { useAppSelector } from 'app/hooks';
import { NEW_TASK_DATA } from 'helper/constants';

jest.mock('axios');

const TasklistControlPaneWithState = () => {
  const listLength = useAppSelector((state) => state.taskCtrl.tasklist.length);
  const showEditor = useAppSelector((state) => state.taskCtrl.showEditor);
  return (
    <div>
      <div>{'There are ' + listLength + ' tasks in the list'}</div>
      <div>{showEditor ? 'The Editor is Open' : 'The Editor is Closed'}</div>
      <TasklistControlPane />
    </div>
  );
};

describe('TasklistControlPane', () => {
  it('renders the list of control buttons', () => {
    renderWithProviders(<TasklistControlPane />);
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(4);
    expect(screen.getByText('Load Tasks')).toBeInTheDocument();
    expect(screen.getByText('Delete Tasks')).toBeInTheDocument();
    expect(screen.getByText('Save Tasks')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });
  it('loads the tasklist from the database when Load Tasks is clicked', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: getMockTasklist(2) })
    );
    renderWithProviders(<TasklistControlPaneWithState />);
    expect(
      screen.getByText('There are 0 tasks in the list')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText('Load Tasks'));
    expect(
      await screen.findByText('There are 2 tasks in the list')
    ).toBeInTheDocument();
  });
  it('deletes the tasklist locally and from the db when Delete Tasks is clicked', async () => {
    axios.get.mockImplementation(() => Promise.resolve());
    renderWithProviders(<TasklistControlPaneWithState />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(2),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    expect(
      screen.getByText('There are 2 tasks in the list')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete Tasks'));
    expect(
      await screen.findByText('There are 0 tasks in the list')
    ).toBeInTheDocument();
  });
  it('saves the tasklist to the db when Saves Tasks is clicked', () => {
    const mockTasklistLength = 2;
    let listIsSaved = false;
    axios.post.mockImplementation((_, data) => {
      listIsSaved =
        data.tasklist === JSON.stringify(getMockTasklist(mockTasklistLength));
      return Promise.resolve();
    });
    renderWithProviders(<TasklistControlPane />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    expect(listIsSaved).toBeFalsy();
    fireEvent.click(screen.getByText('Save Tasks'));
    expect(listIsSaved).toBeTruthy();
  });
  it('creates a new task, saves it to the db, and opens that task in the editor when Create Task is clicked', async () => {
    const mockTasklistLength = 2;
    let taskIsSaved = false;
    axios.post.mockImplementation((_, data) => {
      taskIsSaved = data.data === JSON.stringify(NEW_TASK_DATA);
      return Promise.resolve({ data: { id: 'mock id 2' } });
    });
    renderWithProviders(<TasklistControlPaneWithState />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    expect(taskIsSaved).toBeFalsy();
    expect(
      screen.getByText('There are 2 tasks in the list')
    ).toBeInTheDocument();
    expect(screen.getByText('The Editor is Closed')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Create Task'));
    expect(
      await screen.findByText('There are 3 tasks in the list')
    ).toBeInTheDocument();
    expect(screen.getByText('The Editor is Open')).toBeInTheDocument();
    expect(taskIsSaved).toBeTruthy();
  });
});
