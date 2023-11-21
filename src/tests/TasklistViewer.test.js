import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';
import { renderWithProviders, getMockTasklist } from 'tests/testUtils';
import { initialTaskCtrlState } from 'app/taskCtrlSlice';
import { initialTaskEditorState } from 'app/taskEditorSlice';
import { TASKS_PER_PAGE } from 'helper/constants';

//notes from mike: the test for the nav buttons can be broken up by using a nested describe statement

describe('TasklistViewer', () => {
  it('renders TasklistViewer with no TaskCards', () => {
    renderWithProviders(<TasklistViewer />);

    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(4);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });
  it('displays TaskCards when tasklist is not empty', () => {
    const mockTasklistLength = 2;
    renderWithProviders(<TasklistViewer />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    for (let i = 0; i < mockTasklistLength; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + mockTasklistLength)).toBeNull();
  });
  it('displays 25 TaskCards and has additional pages if tasklist is greater than 25', () => {
    const mockTasklistLength = 26;
    renderWithProviders(<TasklistViewer />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    for (let i = 0; i < TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
  });
  it('navigates between pages when the nav buttons are clicked', () => {
    const mockTasklistLength = 101;
    renderWithProviders(<TasklistViewer />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    for (let i = 0; i < TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    //test next page
    fireEvent.click(screen.getByText('>'));
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE - 1)).toBeNull();
    for (let i = TASKS_PER_PAGE; i < 2 * TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + 2 * TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('2 of 5')).toBeInTheDocument();
    //test last page
    fireEvent.click(screen.getByText('Last'));
    expect(screen.queryByText('mock name 99')).toBeNull();
    expect(screen.getByText('mock name 100')).toBeInTheDocument();
    expect(screen.queryByText('mock name 101')).toBeNull();
    expect(screen.getByText('5 of 5')).toBeInTheDocument();
    //test next doesn't overflow
    fireEvent.click(screen.getByText('Last'));
    expect(screen.queryByText('mock name 99')).toBeNull();
    expect(screen.getByText('mock name 100')).toBeInTheDocument();
    expect(screen.queryByText('mock name 101')).toBeNull();
    expect(screen.getByText('5 of 5')).toBeInTheDocument();
    //test prev page
    fireEvent.click(screen.getByText('<'));
    expect(
      screen.queryByText('mock name ' + 3 * TASKS_PER_PAGE - 1)
    ).toBeNull();
    for (let i = 3 * TASKS_PER_PAGE; i < 4 * TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + 4 * TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('4 of 5')).toBeInTheDocument();
    //test first page
    fireEvent.click(screen.getByText('First'));
    for (let i = 0; i < TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    //test prev doesn't overflow
    fireEvent.click(screen.getByText('<'));
    for (let i = 0; i < TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('1 of 5')).toBeInTheDocument();
  });
});
