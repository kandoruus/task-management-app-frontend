import * as React from 'react';
import { screen } from '@testing-library/react';
import { AppRouter } from './AppRouter';
import { renderWithProviders } from 'helper/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { PAGES } from 'helper/constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AppRouter', () => {
  it('renders the master-wrapper at "/"', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('master-wrapper')).toBeInTheDocument();
  });
  it('renders the welcome-master-pane and the welcome-page at WELCOME_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.WELCOME]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('welcome-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
  });
  it('renders the welcome-master-pane and the login-page at LOGIN_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.LOGIN]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('welcome-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
  it('renders the welcome-master-pane and the signup-page at SIGNUP_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.SIGNUP]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('welcome-master-pane')).toBeInTheDocument();
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();
  });
  it('renders the home-master-pane at HOME_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.HOME]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-master-pane')).toBeInTheDocument();
  });
  it('renders the tasklist-master-pane at TASKS_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.TASKS]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
  });
  it('renders the timesheet-master-pane at TIMESHEET_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.TIMESHEET]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('timesheet-master-pane')).toBeInTheDocument();
  });
  it('renders the account-master-pane at ACCOUNT_ROUTE', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[PAGES.ACCOUNT]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
  });
});
