import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { App } from './App';

describe('App', () => {
  it('renders the master-wrapper', () => {
    renderWithProviders(<App />);
    expect(screen.queryByTestId('master-wrapper')).toBeInTheDocument();
  });
});
