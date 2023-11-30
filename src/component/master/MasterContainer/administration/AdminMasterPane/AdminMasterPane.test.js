import * as React from 'react';
import { screen } from '@testing-library/react';
import { AdminMasterPane } from './AdminMasterPane';
import { renderWithProviders } from 'helper/testUtils';

describe('AdminMasterPane', () => {
  it('TODO', () => {
    renderWithProviders(<AdminMasterPane />);
    expect(screen.getByTestId('admin-master-pane')).toBeInTheDocument();
  });
});
