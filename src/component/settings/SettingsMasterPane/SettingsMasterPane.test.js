import * as React from 'react';
import { screen } from '@testing-library/react';
import { SettingsMasterPane } from './SettingsMasterPane';
import { renderWithProviders } from 'helper/testUtils';

describe('SettingsMasterPane', () => {
  it('TODO', () => {
    renderWithProviders(<SettingsMasterPane />);
    expect(screen.getByTestId('settings-master-pane')).toBeInTheDocument();
  });
});
