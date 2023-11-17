import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { store } from '../app/store';
import { App } from 'App';
import { Provider } from 'react-redux';

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    screen.debug();
  });
});
