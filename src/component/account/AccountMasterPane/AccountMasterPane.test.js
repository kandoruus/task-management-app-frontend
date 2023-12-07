import * as React from 'react';
import { screen } from '@testing-library/react';
import { AccountMasterPane } from './AccountMasterPane';
import { renderWithProviders } from 'helper/testUtils';
import {
  ACCOUNT_PAGE,
  AUTH_PAGE,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';

let mockedUseCookies = () => {
  return { [LOGIN_COOKIE]: LOGGED_IN_STATUS };
};
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockedUseCookies()],
}));

describe('AccountMasterPane', () => {
  it('renders the account-master-pane', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: ACCOUNT_PAGE } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<AccountMasterPane />, { store });
    expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(mockedNavigator).not.toHaveBeenCalled();
  });
  it('dispatches focusAccount when appFocus is off ACCOUNT_PAGE', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: AUTH_PAGE } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<AccountMasterPane />, { store });
    expect(store.dispatch).toHaveBeenCalledWith(
      appCtrlSlice.actions.focusAccount()
    );
  });
  it('navigates to WELCOME_ROUTE when the LOGIN_COOKIE is not set to LOGGED_IN_STATUS', () => {
    mockedUseCookies = () => {
      return { [LOGIN_COOKIE]: LOGGED_OUT_STATUS };
    };
    renderWithProviders(<AccountMasterPane />, {
      preloadedState: { appCtrl: { appFocus: ACCOUNT_PAGE } },
    });
    expect(mockedNavigator).toHaveBeenCalledWith(WELCOME_ROUTE);
  });
});
