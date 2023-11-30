import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import {
  createNewTask,
  deleteTasklist,
  fetchTasklist,
  initialTaskCtrlState,
  taskCtrlSlice,
} from 'app/taskCtrlSlice';
import { taskEditorSlice, initialTaskEditorState } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'helper/testUtils';
import { TasklistControlPane } from './TasklistControlPane';
import axios from 'axios';
//import { useAppSelector } from 'app/hooks';
import { NEW_TASK_DATA, SAVE_ALL_TASKS_API } from 'helper/constants';
import { setupStore } from 'app/store';

jest.mock('axios');

//new unit tests
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
    expect(screen.getByTestId('tasklist-menu-btn')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(1);
    expect(screen.queryByText('Load Tasks')).toBeNull();
    expect(screen.queryByText('Delete Tasks')).toBeNull();
    expect(screen.queryByText('Save Tasks')).toBeNull();
    expect(screen.queryByText('Create Task')).toBeNull();
  });
  it('opens the menu when the menu button is clicked', () => {
    fireEvent.click(screen.getByTestId('tasklist-menu-btn'));
    expect(screen.getByText('Load Tasks')).toBeInTheDocument();
    expect(screen.getByText('Delete Tasks')).toBeInTheDocument();
    expect(screen.getByText('Save Tasks')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });
  describe('when the menu button is clicked', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByTestId('tasklist-menu-btn'));
    });
    it('dispatches the fetchTasklist action when Load Tasks is clicked', () => {
      fireEvent.click(screen.getByText('Load Tasks'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        fetchTasklist().toString()
      );
    });
    it('dispatches the deleteTasklist action when Delete Tasks is clicked', () => {
      fireEvent.click(screen.getByText('Load Tasks'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        deleteTasklist().toString()
      );
    });
    it('posts the tasklist to axios when the Save Tasks button is clicked', () => {
      let mockedApiCall = { url: '', tasklist: '' };
      axios.post.mockImplementation((url, data) => {
        mockedApiCall.url = url;
        mockedApiCall.tasklist = data.tasklist;
        return Promise.resolve();
      });
      expect(mockedApiCall.url).toEqual('');
      expect(mockedApiCall.tasklist).toEqual('');
      fireEvent.click(screen.getByText('Save Tasks'));
      expect(mockedApiCall.url).toEqual(SAVE_ALL_TASKS_API);
      expect(mockedApiCall.tasklist).toEqual(JSON.stringify(mockedList));
    });
    it('dispatches the createNewTask, loadTaskData, and openEditor actions when the Create Task button is clicked.', () => {
      fireEvent.click(screen.getByText('Create Task'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        createNewTask(store.dispatch).toString()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskEditorSlice.actions.loadTaskData({
          data: { ...NEW_TASK_DATA },
          indx: 2,
        })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        taskCtrlSlice.actions.openEditor()
      );
    });
  });
});

/*//integration tests
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
    expect(taskIsSaved).toBe(false);
    expect(
      screen.getByText('There are 2 tasks in the list')
    ).toBeInTheDocument();
    expect(screen.getByText('The Editor is Closed')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Create Task'));
    expect(
      await screen.findByText('There are 3 tasks in the list')
    ).toBeInTheDocument();
    expect(screen.getByText('The Editor is Open')).toBeInTheDocument();
    expect(taskIsSaved).toBe(true);
  });
});*/
