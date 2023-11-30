import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MasterContainer } from './MasterContainer';

describe('MasterContainer', () => {
  it('renders the header and TasklistMasterPane', () => {
    renderWithProviders(<MasterContainer />);
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
  });
});
