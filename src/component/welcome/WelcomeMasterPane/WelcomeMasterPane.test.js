import * as React from 'react';
import { screen } from '@testing-library/react';
import { TasklistMasterPane } from './WelcomeMasterPane';
import { initialTaskCtrlState } from 'app/slices/taskCtrlSlice';
import { initialTaskEditorState } from 'app/slices/taskEditorSlice';
import { renderWithProviders } from 'helper/testUtils';

describe('TasklistMasterPane', () => {
  it('should be rendered and contain the tasklist-control-pane and task-viewer when the app first loads. It should not contain the task-editor', () => {
    renderWithProviders(<TasklistMasterPane />);
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
    expect(screen.queryByTestId('task-editor')).toBeNull();
  });
  it('shows the task-editor when the showEditor flag is true', () => {
    renderWithProviders(<TasklistMasterPane />, {
      preloadedState: {
        taskCtrl: { ...initialTaskCtrlState, showEditor: true },
        taskEditor: initialTaskEditorState,
      },
    });
    expect(screen.getByTestId('task-editor')).toBeInTheDocument();
  });
});
