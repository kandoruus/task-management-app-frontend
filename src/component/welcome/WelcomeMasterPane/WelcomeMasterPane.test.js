import * as React from 'react';
import { screen } from '@testing-library/react';
import { WelcomeMasterPane } from './WelcomeMasterPane';
import { renderWithProviders } from 'helper/testUtils';
import {
  AUTH_PAGE,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  HOME_PAGE,
  HOME_ROUTE,
  WELCOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from 'helper/constants';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';

let mockedUseCookies = () => {
  return { [LOGIN_COOKIE]: LOGGED_OUT_STATUS };
};
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
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockedUseCookies()],
}));

describe('WelcomeMasterPane', () => {
  it('renders the welcome-master-pane', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: AUTH_PAGE } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<WelcomeMasterPane />, { store });
    expect(screen.getByTestId('welcome-master-pane')).toBeInTheDocument();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(mockedNavigator).not.toHaveBeenCalled();
  });
  it('dispatches focusAuth when appFocus is off AUTH_PAGE', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: HOME_PAGE } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<WelcomeMasterPane />, { store });
    expect(store.dispatch).toHaveBeenCalledWith(
      appCtrlSlice.actions.focusAuth()
    );
  });
  it('navigates to HOME_ROUTE when the LOGIN_COOKIE is set to LOGGED_IN_STATUS', () => {
    mockedUseCookies = () => {
      return { [LOGIN_COOKIE]: LOGGED_IN_STATUS };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: AUTH_PAGE } },
    });
    expect(mockedNavigator).toHaveBeenCalledWith(HOME_ROUTE);
    mockedUseCookies = () => {
      return { [LOGIN_COOKIE]: LOGGED_OUT_STATUS };
    };
  });
  it('renders the welcome-page when the location is set to WELCOME_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: WELCOME_ROUTE };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: AUTH_PAGE } },
    });
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
  });
  it('renders the login-page when the location is set to LOGIN_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: LOGIN_ROUTE };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: AUTH_PAGE } },
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
  it('renders the signup-page when the location is set to SIGNUP_ROUTE', () => {
    mockedLocator = () => {
      return { pathname: SIGNUP_ROUTE };
    };
    renderWithProviders(<WelcomeMasterPane />, {
      preloadedState: { appCtrl: { appFocus: AUTH_PAGE } },
    });
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();
  });
});
