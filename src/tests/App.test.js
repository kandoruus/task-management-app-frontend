import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { store } from '../app/store';
import { App } from 'App';
import { Provider } from 'react-redux';
import axios from 'axios';

jest.mock('axios');

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-control-pane')).toBeInTheDocument();
    expect(screen.getByTestId('task-viewer')).toBeInTheDocument();
    expect(screen.queryByTestId('task-editor')).toBeNull();
  });
  it('opens the Editor when the create task button is clicked', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    axios.post = jest.fn().mockResolvedValue({ data: { id: 'mockid' } });
    fireEvent.click(
      screen.getAllByRole('button').find((button) => {
        return button.value == 'Create Task';
      })
    );
    expect(await screen.findByTestId('task-editor')).toBeInTheDocument();
    expect(screen.queryByTestId('task-viewer')).toBeNull();
  });
});
