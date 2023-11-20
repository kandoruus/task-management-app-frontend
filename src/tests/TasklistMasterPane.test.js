import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { setupStore } from 'app/store';
import { Provider } from 'react-redux';
import { TasklistMasterPane } from 'component/TaskListManagement/TasklistMasterPane';
import { taskCtrlSlice } from 'app/taskCtrlSlice';
import { useAppDispatch } from 'app/hooks';

describe('TasklistMasterPane', () => {
  it('should be rendered and contain the tasklist-control-pane and task-viewer when the app first loads. It should not contain the task-editor', () => {
    render(
      <Provider store={setupStore()}>
        <TasklistMasterPane />
      </Provider>
    );
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
    expect(screen.queryByTestId('task-editor')).toBeNull();
  });
  it('shows the task-editor when store sets the showEditor flag to true', async () => {
    const HelperForTest = () => {
      const dispatch = useAppDispatch();
      const [dispatchIsSent, setdispatchIsSent] = React.useState(false);
      React.useState(() => {
        if (!dispatchIsSent) {
          dispatch(taskCtrlSlice.actions.openEditor());
          setdispatchIsSent(true);
        }
      });
      return;
    };
    render(
      <Provider store={setupStore()}>
        <HelperForTest />
        <TasklistMasterPane />
      </Provider>
    );
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(await screen.findByTestId('task-editor')).toBeInTheDocument();
    expect(screen.queryByTestId('tasklist-viewer')).toBeNull();
  });
});
