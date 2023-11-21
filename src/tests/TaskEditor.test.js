import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { initialTaskCtrlState } from 'app/taskCtrlSlice';
import { initialTaskEditorState } from 'app/taskEditorSlice';
import { getMockTasklist, renderWithProviders } from 'tests/testUtils';
import axios from 'axios';
import { useAppSelector } from 'app/hooks';
import { NEW_TASK_DATA } from 'helper/constants';
import { TaskEditor } from 'component/TaskListManagement/TaskEditor';
import exp from 'constants';

jest.mock('axios');

//setup fuction copied from https://claritydev.net/blog/testing-select-components-react-testing-library
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...renderWithProviders(jsx),
  };
}

describe('TaskEditor', () => {
  it('has a name field, a description field, a status field, a priority field, a cancel button, a delete button, a save button, and a save and exit button.', () => {
    renderWithProviders(<TaskEditor />, {
      preloadedState: {
        taskCtrl: initialTaskCtrlState,
        taskEditor: {
          ...initialTaskEditorState,
          indexOfFocus: 0,
        },
      },
    });
    expect(
      screen.getByText(initialTaskEditorState.data.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(initialTaskEditorState.data.description)
    ).toBeInTheDocument();
    const selectBoxes = screen.getAllByRole('combobox');
    expect(selectBoxes.length).toEqual(2);
    expect(selectBoxes.indexOf(initialTaskEditorState.data.status)).not.toEqual(
      -1
    );
    expect(
      selectBoxes.indexOf(initialTaskEditorState.data.priority)
    ).not.toEqual(-1);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Save and Exit')).toBeInTheDocument();
  }); /*
  it('each field displays the expect data', () => {
    const mockTasklistLength = 1;
    renderWithProviders(<TaskEditor />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: getMockTasklist(mockTasklistLength),
        },
        taskEditor: {
          ...getMockTasklist(mockTasklistLength).data,
          indexOfFocus: 0,
        },
      },
    });
    expect(true).toBeFalsy();
  });
  it('the cancel button changes the flag showEditor to false, and changed data is not saved to the tasklist.', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it('the delete button changes the showEditor flag to false and removes the task from the tasklist and the database', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it("the save button updates the tasks's data in the tasklist and does not change the showEditor flag", () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it("the save and exit button updates the task's data in the tasklist and changes the showEditor flag to false", () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it('on change to the name input field, the taskEditor.data.name will update to match', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it('on change to the description field, the taskEditor.data.description will update to match', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it('on change to the status field the taskEditor.data.status will update to match', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy();
  });
  it('on change to the priority field the taskEditor.data.priority will update to match', () => {
    renderWithProviders(<TaskEditor />);
    expect(true).toBeFalsy()w;
  });*/
});
