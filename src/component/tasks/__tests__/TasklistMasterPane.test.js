import * as React from 'react';
import { screen } from '@testing-library/react';
import { TasklistMasterPane } from '../TasklistMasterPane';
import { initialTaskCtrlState } from 'app/slices/taskCtrlSlice';
import { renderWithProviders } from 'helper/testUtils';
import { PAGES } from 'helper/constants';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe('TasklistMasterPane', () => {
  it('should be rendered and contain the tasklist-control-pane and task-viewer when the app first loads. It should not contain the task-editor', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: PAGES.TASKS,
        },
      }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<TasklistMasterPane />, { store });
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
    expect(screen.queryByTestId('task-editor')).toBeNull();
    expect(mockedNavigator).not.toHaveBeenCalled();
  });
  it('shows the task-editor when the showEditor flag is true', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: PAGES.TASKS,
        },
        taskCtrl: { ...initialTaskCtrlState, showEditor: true },
      }),
    };
    renderWithProviders(<TasklistMasterPane />, { store });
    expect(screen.getByTestId('task-editor')).toBeInTheDocument();
  });
  it('dispatches the focusTasks action when the appFocus is off the TASKS_PAGE', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: PAGES.HOME,
        },
      }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<TasklistMasterPane />, { store });
    expect(store.dispatch).toHaveBeenCalledWith(
      appCtrlSlice.actions.focusTasks()
    );
  });
});
