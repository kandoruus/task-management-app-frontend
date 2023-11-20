import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { setupStore } from 'app/store';
import { Provider } from 'react-redux';
import { TasklistViewer } from 'component/TaskListManagement/TasklistViewer';

jest.mock('axios');

const mockTasklist = [
  {
    _id: 'mock _id 1',
    data: {
      name: 'mock name 1',
      description: 'mock description 1',
      status: 'mock status 1',
      priority: 'mock priority 1',
    },
    __v: 0,
  },
  {
    _id: 'mock _id 2',
    data: {
      name: 'mock name 2',
      description: 'mock description 2',
      status: 'mock status 2',
      priority: 'mock priority 2',
    },
    __v: 0,
  },
];

describe('TasklistViewer', () => {
  it('renders TasklistViewer', () => {
    render(
      <Provider store={setupStore()}>
        <TasklistViewer />
      </Provider>
    );
    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
  });
});
