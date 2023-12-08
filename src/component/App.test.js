import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renders the master-wrapper', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('master-wrapper')).toBeInTheDocument();
  });
});
