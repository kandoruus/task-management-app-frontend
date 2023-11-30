import * as React from 'react';
import { screen } from '@testing-library/react';
import { AccountMasterPane } from './AccountMasterPane';
import { renderWithProviders } from 'helper/testUtils';

describe('AccountMasterPane', () => {
  it('TODO', () => {
    renderWithProviders(<AccountMasterPane />);
    expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
  });
});
