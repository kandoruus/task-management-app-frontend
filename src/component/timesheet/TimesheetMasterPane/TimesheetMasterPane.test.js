import * as React from 'react';
import { screen } from '@testing-library/react';
import { TimesheetMasterPane } from './TimesheetMasterPane';
import { renderWithProviders } from 'helper/testUtils';

describe('TimesheetMasterPane', () => {
  it('TODO', () => {
    renderWithProviders(<TimesheetMasterPane />);
    expect(screen.getByTestId('timesheet-master-pane')).toBeInTheDocument();
  });
});
