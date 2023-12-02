import * as React from 'react';
import { screen } from '@testing-library/react';
import { HomeMasterPane } from './HomeMasterPane';
import { renderWithProviders } from 'helper/testUtils';

describe('HomeMasterPane', () => {
  it('TODO', () => {
    renderWithProviders(<HomeMasterPane />);
    expect(screen.getByTestId('home-master-pane')).toBeInTheDocument();
  });
});
