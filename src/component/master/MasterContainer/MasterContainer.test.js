import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MasterContainer } from './MasterContainer';

describe('MasterContainer', () => {
  beforeEach(() => {
    renderWithProviders(<MasterContainer />);
  });
  it('renders the header and the home page', () => {
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByTestId('main-menu-btn')).toBeInTheDocument();
    expect(screen.getByTestId('home-master-pane')).toBeInTheDocument();
  });
  it('opens the menu when the menu button is clicked', async () => {
    fireEvent.click(screen.getByTestId('main-menu-btn'));
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(await screen.findByText('Tasks')).toBeInTheDocument();
    expect(await screen.findByText('Timesheet')).toBeInTheDocument();
    expect(await screen.findByText('Account')).toBeInTheDocument();
    expect(await screen.findByText('Settings')).toBeInTheDocument();
    expect(await screen.findByText('Administration')).toBeInTheDocument();
  });
  describe('when the menu is open', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByTestId('main-menu-btn'));
    });
    it('navigates to the tasks page when the Tasks option is clicked', async () => {
      fireEvent.click(await screen.findByText('Tasks'));
      expect(
        await screen.findByTestId('tasklist-master-pane')
      ).toBeInTheDocument();
    });
    it('navigates to the timesheet page when the Timesheet option is clicked', async () => {
      fireEvent.click(await screen.findByText('Timesheet'));
      expect(
        await screen.findByTestId('timesheet-master-pane')
      ).toBeInTheDocument();
    });
    it('navigates to the account page when the Account option is clicked', async () => {
      fireEvent.click(await screen.findByText('Account'));
      expect(
        await screen.findByTestId('account-master-pane')
      ).toBeInTheDocument();
    });
    it('navigates to the settings page when the Settings option is clicked', async () => {
      fireEvent.click(await screen.findByText('Settings'));
      expect(
        await screen.findByTestId('settings-master-pane')
      ).toBeInTheDocument();
    });
    it('navigates to the administration page when the Administration option is clicked', async () => {
      fireEvent.click(await screen.findByText('Administration'));
      expect(
        await screen.findByTestId('admin-master-pane')
      ).toBeInTheDocument();
    });
    it('navigates to the home page when the Home option is clicked', async () => {
      fireEvent.click(await screen.findByText('Tasks'));
      expect(
        await screen.findByTestId('tasklist-master-pane')
      ).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('main-menu-btn'));
      fireEvent.click(await screen.findByText('Home'));
      expect(await screen.findByTestId('home-master-pane')).toBeInTheDocument();
    });
  });
});
