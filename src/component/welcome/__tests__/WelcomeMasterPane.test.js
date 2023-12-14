import * as React from 'react';
import { screen } from '@testing-library/react';
import { WelcomeMasterPane } from '../WelcomeMasterPane';
import { renderWithProviders } from 'helper/testUtils';
import { PAGES } from 'helper/constants';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';

let mockedLocator = () => {
  return { pathname: '' };
};
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
  useLocation: () => {
    return { ...mockedLocator() };
  },
}));

describe('WelcomeMasterPane', () => {
  it('renders the welcome-master-pane', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: PAGES.AUTH } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<WelcomeMasterPane />, { store });
    expect(screen.getByTestId('welcome-master-pane')).toBeInTheDocument();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(mockedNavigator).not.toHaveBeenCalled();
  });
  it('dispatches focusAuth when appFocus is off AUTH_PAGE', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: PAGES.HOME } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<WelcomeMasterPane />, { store });
    expect(store.dispatch).toHaveBeenCalledWith(
      appCtrlSlice.actions.focusAuth()
    );
  });
  it('renders the welcome-page when the location is set to WELCOME_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: PAGES.WELCOME };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: PAGES.AUTH } },
    });
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
  });
  it('renders the login-page when the location is set to LOGIN_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: PAGES.LOGIN };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: PAGES.AUTH } },
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
  it('renders the signup-page when the location is set to SIGNUP_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: PAGES.SIGNUP };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: PAGES.AUTH } },
    });
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();
  });
});
